import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Deepgram } from '@deepgram/sdk';
import { AppError } from '../lib/errors.js';

const ffmpeg = createFFmpeg({ log: true });
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY!);

export async function transcribeVideoFromUrl(videoUrl: string): Promise<string> {
  try {
    // Download video and extract audio
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoUrl));
    
    // Extract audio in WAV format
    await ffmpeg.run(
      '-i', 'input.mp4',
      '-vn',
      '-acodec', 'pcm_s16le',
      '-ar', '16000',
      '-ac', '1',
      'audio.wav'
    );

    const audioData = ffmpeg.FS('readFile', 'audio.wav');

    // Clean up files
    ffmpeg.FS('unlink', 'input.mp4');
    ffmpeg.FS('unlink', 'audio.wav');

    // Transcribe using Deepgram
    const response = await deepgram.transcription.preRecorded(
      { buffer: audioData, mimetype: 'audio/wav' },
      { 
        punctuate: true,
        utterances: true,
        numerals: true,
        paragraphs: true
      }
    );

    // Convert to WebVTT format
    return convertToWebVTT(response.results);
  } catch (error) {
    console.error('Transcription error:', error);
    throw new AppError('Failed to transcribe video', 500);
  }
}

function convertToWebVTT(results: any): string {
  let vtt = 'WEBVTT\n\n';
  
  results.channels[0].alternatives[0].words.forEach((word: any, index: number) => {
    const startTime = formatTimestamp(word.start);
    const endTime = formatTimestamp(word.end);
    vtt += `${startTime} --> ${endTime}\n${word.word}\n\n`;
  });

  return vtt;
}

function formatTimestamp(seconds: number): string {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = date.getUTCMilliseconds().toString().padStart(3, '0');
  
  return `${hours}:${minutes}:${secs}.${ms}`;
}