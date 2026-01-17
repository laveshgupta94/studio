'use client';

import { useState } from 'react';
import { UploadCloud, File as FileIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { uploadCollegeData } from '@/app/actions';

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a file to upload.',
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const result = await uploadCollegeData(content);

      setIsUploading(false);

      if (result.success) {
        toast({
          title: 'Upload successful',
          description: 'The college data has been updated for the AI chatbot.',
        });
        setFile(null);
      } else {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: result.error || 'An unexpected error occurred.',
        });
      }
    };
    // For simplicity, we're reading all file types as text.
    // In a real application, you might handle PDFs and other formats differently on the server.
    reader.readAsText(file);
  };

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">Admin Portal</h1>
      <p className="text-muted-foreground mt-2">Upload college data to be used by the AI chatbot.</p>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload College Data</CardTitle>
            <CardDescription>Upload a text-based file (CSV or TXT) containing information for the chatbot. PDF parsing is not supported in this example.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 font-medium text-muted-foreground">Drag & drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supported formats: CSV, TXT</p>
              <Input type="file" className="sr-only" id="file-upload" onChange={handleFileChange} accept=".csv,.txt" />
              <Button asChild variant="outline" className="mt-4">
                <label htmlFor="file-upload">Browse Files</label>
              </Button>
            </div>

            {file && (
              <div className="mt-6">
                <h3 className="font-medium">Selected File:</h3>
                <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3 mt-2">
                    <div className="flex items-center gap-3">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{file.name}</span>
                    </div>
                  <Button size="sm" variant="ghost" onClick={() => setFile(null)}>Remove</Button>
                </div>
              </div>
            )}

            <Button onClick={handleUpload} disabled={!file || isUploading} className="mt-6 w-full">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload and Update AI'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
