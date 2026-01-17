import { UploadCloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">Admin Portal</h1>
      <p className="text-muted-foreground mt-2">Upload college data to be used by the AI chatbot.</p>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload College Data</CardTitle>
            <CardDescription>Upload CSV, PDF, or TXT files containing information about exam schedules, events, and attendance rules.</CardDescription>
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
      </div>
    </div>
  );
}
