'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenCheck, Calendar, LayoutDashboard, MessageCircle, Shield, LogOut } from 'lucide-react';
import type { NavItem } from '@/lib/types';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const studentNavItems: NavItem[] = [
  { href: '/dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/chat', title: 'AI Chat', icon: MessageCircle },
  { href: '/dashboard/timetable', title: 'Timetable', icon: Calendar },
];

const adminNavItems: NavItem[] = [
  { href: '/dashboard/admin', title: 'Upload Data', icon: Shield },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith('/dashboard/admin');
  const navItems = isAdminPage ? adminNavItems : studentNavItems;
  const portalTitle = isAdminPage ? 'Admin Portal' : 'Student Portal';
  const portalSubtitle = isAdminPage ? 'Data Management' : 'Student Dashboard';

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-20 items-center gap-2 border-b p-4">
        <BookOpenCheck className="h-8 w-8 text-primary" />
        <div className="flex flex-col">
            <h1 className="font-headline text-xl font-bold">{portalTitle}</h1>
            <p className="text-sm text-muted-foreground">{portalSubtitle}</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="w-full justify-start"
                  asChild
                >
                  <a>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <div className="mt-auto border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" legacyBehavior passHref>
              <SidebarMenuButton className="w-full justify-start">
                <a>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </div>
  );
}
