import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function AttendanceSummary() {
  const attendancePercentage = 88;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>Attendance Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-muted-foreground">Overall Attendance</p>
                <p className="font-medium">{attendancePercentage}%</p>
            </div>
          <Progress value={attendancePercentage} aria-label={`${attendancePercentage}% attendance`} />
          <p className="text-xs text-muted-foreground pt-1">
            Great job! Your attendance is well above the required threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
