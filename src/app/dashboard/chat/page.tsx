import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-8rem)]">
        <h1 className="font-headline text-3xl font-bold mb-2">AI Assistant</h1>
        <p className="text-muted-foreground mb-6">Your personal academic support and college info bot.</p>
        <ChatInterface />
    </div>
  );
}
