import { Clock } from 'lucide-react';
import type { Deadline } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const deadlines: Deadline[] = [
  { id: '1', subject: 'Physics', title: 'Lab Report 3', dueDate: '3 days' },
  { id: '2', subject: 'History', title: 'Essay Draft', dueDate: '5 days' },
  { id: '3', subject: 'Math', title: 'Problem Set 5', dueDate: '1 week' },
  { id: '4', subject: 'CS', title: 'Project Milestone 2', dueDate: '1 week' },
];

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>Upcoming Deadlines</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {deadlines.map((deadline) => (
            <li key={deadline.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{deadline.title}</p>
                <p className="text-sm text-muted-foreground">{deadline.subject}</p>
              </div>
              <Badge variant="secondary">{deadline.dueDate}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
