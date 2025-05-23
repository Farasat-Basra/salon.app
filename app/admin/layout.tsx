"use client"

import { Button } from "@/components/ui/button"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Home, MessageSquare, Scissors, Settings, Users, ImageIcon, Instagram } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin"} tooltip="Overview">
                      <Link href="/admin">
                        <Home className="h-5 w-5" />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/appointments"} tooltip="Appointments">
                      <Link href="/admin/appointments">
                        <Calendar className="h-5 w-5" />
                        <span>Appointments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/services"} tooltip="Services">
                      <Link href="/admin/services">
                        <Scissors className="h-5 w-5" />
                        <span>Services</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/feedback"} tooltip="Feedback">
                      <Link href="/admin/feedback">
                        <MessageSquare className="h-5 w-5" />
                        <span>Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/staff"} tooltip="Staff">
                      <Link href="/admin/staff">
                        <Users className="h-5 w-5" />
                        <span>Staff</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/analytics"} tooltip="Analytics">
                      <Link href="/admin/analytics">
                        <BarChart3 className="h-5 w-5" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Content</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/gallery"} tooltip="Gallery">
                      <Link href="/admin/gallery">
                        <ImageIcon className="h-5 w-5" />
                        <span>Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/instagram"} tooltip="Instagram">
                      <Link href="/admin/instagram">
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/settings"} tooltip="Settings">
                      <Link href="/admin/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Exit Admin
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {pathname === "/admin" && "Dashboard Overview"}
              {pathname === "/admin/appointments" && "Manage Appointments"}
              {pathname === "/admin/services" && "Manage Services"}
              {pathname === "/admin/feedback" && "Customer Feedback"}
              {pathname === "/admin/staff" && "Staff Management"}
              {pathname === "/admin/analytics" && "Analytics"}
              {pathname === "/admin/gallery" && "Gallery Management"}
              {pathname === "/admin/instagram" && "Instagram Management"}
              {pathname === "/admin/settings" && "Settings"}
            </h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <SidebarTrigger />
            </div>
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
