'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CornerDownLeft, User, Bot, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { handleChatMessage } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  const onSubmit = async (data: z.infer<typeof chatSchema>) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: data.message,
    };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    setIsLoading(true);

    const result = await handleChatMessage(data.message);
    setIsLoading(false);

    if (result.success && result.response) {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.error || "Sorry, something went wrong. Please try again."
        }
        setMessages((prev) => [...prev, errorMessage]);
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex h-full flex-col rounded-xl border bg-card">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
            <AnimatePresence>
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-muted-foreground p-8"
                    >
                        <Bot size={48} className="mx-auto mb-4" />
                        <h2 className="font-headline text-2xl mb-2">CampusAI Chat</h2>
                        <p>Ask me about your courses, deadlines, or college events.</p>
                    </motion.div>
                )}
                {messages.map((message) => (
                <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' && 'justify-end'
                    )}
                >
                    {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    )}
                    <div
                    className={cn(
                        'max-w-md rounded-lg px-4 py-3',
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                    >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                     <Avatar className="h-8 w-8 border">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} data-ai-hint={userAvatar.imageHint}/>}
                        <AvatarFallback>
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    )}
                </motion.div>
                ))}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4"
                    >
                         <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div className="max-w-md rounded-lg bg-muted px-4 py-3 flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <Input
            {...form.register('message')}
            placeholder="Ask anything about your academics..."
            className="pr-16"
            autoComplete="off"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-10"
            disabled={isLoading}
          >
            <CornerDownLeft className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
