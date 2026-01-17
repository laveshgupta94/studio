import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';
import { SignupForm } from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">CampusAI</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/">Sign In</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter">Create an Account</h1>
            <p className="mt-2 text-muted-foreground">Join CampusAI to supercharge your studies</p>
          </div>
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
