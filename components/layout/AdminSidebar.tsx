'use client'

/**
 * Admin Sidebar Navigation
 * Collapsible sidebar with navigation menu for all admin sections
 */

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  FileText,
  Box,
  Users,
  Building2,
  TrendingUp,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Mail,
  UserCog,
  FileCode,
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'Pages',
    href: '/admin/pages',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'Blog Posts',
    href: '/admin/blog',
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    title: 'Agents',
    href: '/admin/agents',
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: 'Lenders',
    href: '/admin/lenders',
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: 'Mortgage Rates',
    href: '/admin/rates',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: 'Applications',
    href: '/admin/applications',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: 'Contacts',
    href: '/admin/contacts',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: <UserCog className="w-5 h-5" />,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

interface AdminSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg">approvU Admin</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn('h-8 w-8', isCollapsed && 'mx-auto')}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <nav className="space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                  isCollapsed && 'justify-center'
                )}
                title={isCollapsed ? item.title : undefined}
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-4">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium">approvU CMS</p>
            <p>Version 2.0.0</p>
          </div>
        </div>
      )}
    </aside>
  )
}
