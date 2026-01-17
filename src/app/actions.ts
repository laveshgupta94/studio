'use server';

import { academicSupportChatbot } from '@/ai/flows/ai-chatbot-academic-support';
import { createStudyTimetable } from '@/ai/flows/automatic-study-timetable';
import { calculateStudyConsistencyScore } from '@/ai/flows/data-analytics-study-consistency-score';
import { revalidatePath } from 'next/cache';
import pdf from 'pdf-parse';

// Simple in-memory store for college data. In a production app, use a database.
let collegeData: string | null = null;

export async function uploadCollegeData(formData: FormData) {
  try {
    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No file uploaded.' };
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let textContent = '';

    if (file.type === 'application/pdf') {
      const data = await pdf(fileBuffer);
      textContent = data.text;
    } else if (file.type === 'text/plain' || file.type === 'text/csv') {
      textContent = fileBuffer.toString('utf-8');
    } else {
      return { success: false, error: 'Unsupported file type. Please upload a PDF, TXT, or CSV file.' };
    }

    collegeData = textContent;
    return { success: true };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to parse or store college data: ${errorMessage}` };
  }
}

export async function handleChatMessage(message: string) {
  try {
    const response = await academicSupportChatbot({
      query: message,
      collegeData: collegeData ?? undefined,
    });
    return { success: true, response: response.response };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get response from AI.' };
  }
}

export async function getStudyScore() {
  try {
    const mockActivityHistory = [
      { date: '2024-07-01', durationMinutes: 120, type: 'studying' },
      { date: '2024-07-02', durationMinutes: 90, type: 'practice exams' },
      { date: '2024-07-03', durationMinutes: 150, type: 'studying' },
      { date: '2024-07-05', durationMinutes: 60, type: 'reading' },
      { date: '2024-07-07', durationMinutes: 180, type: 'studying' },
    ];
    const response = await calculateStudyConsistencyScore({
      activityHistory: mockActivityHistory,
      expectedStudyHoursPerWeek: 10,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to calculate study score.' };
  }
}

export async function generateTimetable(courses: string[], preferences: string) {
    const examDates = courses.reduce((acc, course, index) => {
        const date = new Date();
        date.setDate(date.getDate() + (index + 1) * 7);
        acc[course] = date.toISOString().split('T')[0];
        return acc;
    }, {} as Record<string, string>);

  try {
    const response = await createStudyTimetable({
      courses,
      examDates,
      studentPreferences: preferences,
    });
    revalidatePath('/dashboard/timetable');
    return { success: true, timetable: response.timetable };
  } catch (error)
  {
    console.error(error);
    return { success: false, error: 'Failed to generate timetable.' };
  }
}
