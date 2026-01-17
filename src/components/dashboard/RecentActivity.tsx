import { History, MessageCircle, Calendar, BarChart2 } from 'lucide-react';
import type { RecentActivityItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities: RecentActivityItem[] = [
  { id: '1', type: 'chat', description: 'Asked about exam dates for Physics 201', timestamp: '2 hours ago' },
  { id: '2', type: 'timetable', description: 'Generated a new study timetable', timestamp: '1 day ago' },
  { id: '3', type: 'analytics', description: 'Viewed study consistency score', timestamp: '2 days ago' },
  { id: '4', type: 'chat', description: 'Summarized a chapter from History textbook', timestamp: '3 days ago' },
];

const iconMap = {
  chat: MessageCircle,
  timetable: Calendar,
  analytics: BarChart2,
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <li key={activity.id} className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-secondary p-2">
                    <Icon className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
