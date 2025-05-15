
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  GitBranch, 
  Database, 
  Server, 
  Settings,
  FileCode,
  Monitor,
  Search,
  Shield,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface NavItemProps {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary';
  active?: boolean;
}

const NavItem = ({ title, icon: Icon, path, badge, badgeVariant = 'default', active = false }: NavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={active ? "bg-sidebar-accent" : ""}>
        <Link to={path} className="flex items-center justify-between">
          <span className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            <span>{title}</span>
          </span>
          {badge && (
            <Badge variant={badgeVariant} className="ml-2">
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const AppSidebar = () => {
  // Get current path to determine active link
  const currentPath = window.location.pathname;

  const mainNavItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/", badge: "" },
    { title: "Applications", icon: Monitor, path: "/applications", badge: "12" },
    { title: "Repositories", icon: GitBranch, path: "/repositories", badge: "" },
    { title: "Infrastructure", icon: Server, path: "/infrastructure", badge: "" },
    { title: "Databases", icon: Database, path: "/databases", badge: "" }
  ];

  const toolNavItems = [
    { title: "Search", icon: Search, path: "/search", badge: "" },
    { title: "Manifests", icon: FileCode, path: "/manifests", badge: "" },
    { title: "Security", icon: Shield, path: "/security", badge: "3", badgeVariant: "destructive" as const },
    { title: "Alerts", icon: AlertCircle, path: "/alerts", badge: "5", badgeVariant: "destructive" as const },
    { title: "Settings", icon: Settings, path: "/settings", badge: "" }
  ];

  return (
    <Sidebar>
      <SidebarContent className="py-2">
        <div className="px-3 py-2 mb-6">
          <h2 className="font-bold text-lg flex items-center">
            <GitBranch className="mr-2 h-5 w-5 text-gitops-teal" />
            <span className="text-gitops-teal">GitOps</span>
            <span className="ml-1">Console</span>
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <NavItem 
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  path={item.path}
                  badge={item.badge}
                  active={currentPath === item.path}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolNavItems.map((item) => (
                <NavItem 
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  path={item.path}
                  badge={item.badge}
                  badgeVariant={item.badgeVariant}
                  active={currentPath === item.path}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-2 px-3 border-t border-sidebar-border">
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-gitops-green mr-1.5 animate-pulse-soft"></div>
            <span>Connected to ArgoCD</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
