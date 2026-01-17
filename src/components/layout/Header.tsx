"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  ChevronDown,
  LogOut,
  PanelLeft,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

export function Header() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      {isMobile && <SidebarTrigger />}
      <h1 className="font-headline text-xl font-semibold">Dashboard</h1>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-4 w-4 justify-center p-0 text-xs"
              >
                3
              </Badge>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-1">
              <p className="font-medium">Exam Reminder</p>
              <p className="text-xs text-muted-foreground">
                Your Math 101 final is tomorrow.
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1">
              <p className="font-medium">New Event</p>
              <p className="text-xs text-muted-foreground">
                The annual tech fair is next week.
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1">
              <p className="font-medium text-destructive">Attendance Alert</p>
              <p className="text-xs text-muted-foreground">
                Your attendance for Physics 201 is low.
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {userAvatar && (
                  <Image
                    src={userAvatar.imageUrl}
                    alt={userAvatar.description}
                    width={40}
                    height={40}
                    data-ai-hint={userAvatar.imageHint}
                  />
                )}
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">John Doe</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
