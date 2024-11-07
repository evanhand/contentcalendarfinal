import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../lib/errors.js';
import { generateContentIdeas } from '../services/contentService.js';
import { generateHashtags } from '../services/hashtagService.js';
import { analyzeContentPerformance } from '../services/analyticsService.js';
import { transcribeVideoFromUrl } from '../services/transcriptionService.js';

// ... existing functions ...

export async function transcribeVideo(req: Request, res: Response) {
  const { videoUrl } = req.body;
  const userId = req.user!.id;

  try {
    const transcription = await transcribeVideoFromUrl(videoUrl);
    
    // Save to history
    await prisma.transcription.create({
      data: {
        userId,
        videoUrl,
        transcription
      }
    });

    res.json({ transcription });
  } catch (error) {
    throw new AppError('Error transcribing video', 500);
  }
}