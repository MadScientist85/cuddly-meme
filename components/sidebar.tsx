"use client"

import { LucideFileText, LucideSettings, LucideHome, LucideBookOpen, LucideHistory } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Dashboard", href: "/", icon: LucideHome },
  { name: "Reference Library", href: "/references", icon: LucideBookOpen },
  { name: "History", href: "/history", icon: LucideHistory },
  { name: "Templates", href: "/templates", icon: LucideFileText },
  { name: "Settings", href: "/settings", icon: LucideSettings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">LA</span>
          </div>
          <span className="font-semibold text-lg">Legal Assistant</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">Legal AI Assistant v1.0</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
