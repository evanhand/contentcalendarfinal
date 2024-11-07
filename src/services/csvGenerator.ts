import { ContentTemplate } from '../types';

export function generateCSV(schedule: ContentTemplate): string {
  let csv = 'Week,Day,Content Idea,Content Type,Talking Points,Hooks,Additional Notes\n';

  schedule.weeks.forEach(week => {
    week.days.forEach(day => {
      const row = [
        `Week ${week.weekNumber}`,
        day.day,
        day.overallIdea,
        day.contentType,
        day.talkingPoints.join(' | '),
        day.hooks.join(' | '),
        day.additionalNotes
      ].map(field => `"${field.replace(/"/g, '""')}"`);

      csv += row.join(',') + '\n';
    });
  });

  return csv;
}