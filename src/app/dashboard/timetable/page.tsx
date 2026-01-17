'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTimetable } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const timetableSchema = z.object({
  courses: z.string().min(1, 'Please enter at least one course.'),
  preferences: z.string().optional(),
});

export default function TimetablePage() {
  const [generatedTimetable, setGeneratedTimetable] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof timetableSchema>>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      courses: '',
      preferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof timetableSchema>) {
    setIsLoading(true);
    setGeneratedTimetable(null);
    const coursesArray = values.courses.split(',').map(course => course.trim()).filter(Boolean);
    
    const result = await generateTimetable(coursesArray, values.preferences || 'No specific preferences.');
    
    setIsLoading(false);

    if (result.success && result.timetable) {
      setGeneratedTimetable(result.timetable);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error generating timetable',
        description: result.error || 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="font-headline text-3xl font-bold">Automatic Study Timetable</h1>
        <p className="text-muted-foreground mt-2">Let AI create a personalized study plan for you based on your courses and preferences.</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="courses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Courses</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Math 101, Physics 201, History 110" {...field} />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">Enter your courses, separated by commas.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Study Preferences</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., I prefer studying in the mornings, I'm busy on weekends..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Timetable'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>Your personalized AI-generated study plan will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : generatedTimetable ? (
              <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-sans text-sm">{generatedTimetable}</pre>
            ) : (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                <p>Fill out the form to generate your study timetable.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
