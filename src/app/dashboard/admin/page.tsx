import { UploadCloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">Admin Portal</h1>
      <p className="text-muted-foreground mt-2">Manage college data for the AI assistant.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload College Data</CardTitle>
            <CardDescription>Upload CSV or PDF files for exam schedules, events, and attendance rules.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 font-medium text-muted-foreground">Drag & drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Supported formats: CSV, PDF, TXT</p>
              <Input type="file" className="sr-only" id="file-upload" />
              <Button asChild variant="outline" className="mt-4">
                <label htmlFor="file-upload">Browse Files</label>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>Manage previously uploaded data sources.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium">exam_schedule_fall_2024.csv</p>
                  <p className="text-sm text-muted-foreground">Uploaded 2 days ago</p>
                </div>
                <Button variant="ghost" size="sm">Manage</Button>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium">campus_events_september.pdf</p>
                  <p className="text-sm text-muted-foreground">Uploaded 1 week ago</p>
                </div>
                <Button variant="ghost" size="sm">Manage</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
