'use client';

import { useEffect, useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { getStudyScore } from '@/app/actions';

const chartData = [
  { subject: 'Math', performance: 85, fill: 'var(--color-math)' },
  { subject: 'Physics', performance: 72, fill: 'var(--color-physics)' },
  { subject: 'History', performance: 91, fill: 'var(--color-history)' },
  { subject: 'English', performance: 88, fill: 'var(--color-english)' },
  { subject: 'CS', performance: 78, fill: 'var(--color-cs)' },
];

const chartConfig = {
  performance: {
    label: 'Performance',
  },
  math: {
    label: 'Math',
    color: 'hsl(var(--chart-1))',
  },
  physics: {
    label: 'Physics',
    color: 'hsl(var(--chart-2))',
  },
  history: {
    label: 'History',
    color: 'hsl(var(--chart-3))',
  },
  english: {
    label: 'English',
    color: 'hsl(var(--chart-4))',
  },
  cs: {
    label: 'Computer Science',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function AnalyticsCharts() {
  const [scoreData, setScoreData] = useState<{ consistencyScore: number; summary: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScore() {
      const result = await getStudyScore();
      if (result.success && result.data) {
        setScoreData(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    }
    fetchScore();
  }, []);

  const consistencyScorePercentage = useMemo(() => {
    if (scoreData?.consistencyScore) {
      return Math.round(scoreData.consistencyScore * 100);
    }
    return 0;
  }, [scoreData]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Study Consistency</CardTitle>
          <CardDescription>
            {scoreData ? scoreData.summary : 'Analyzing your study habits...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center">
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : scoreData ? (
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(hsl(var(--primary)) ${consistencyScorePercentage * 3.6}deg, hsl(var(--muted)) 0deg)`,
                }}
              >
                <div className="absolute flex h-[85%] w-[85%] items-center justify-center rounded-full bg-card">
                  <span className="font-headline text-4xl font-bold">{consistencyScorePercentage}%</span>
                </div>
              </div>
            ) : (
              <p>Loading score...</p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
          <CardDescription>Your performance across different subjects.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="subject" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="performance" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
