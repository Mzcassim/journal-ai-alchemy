
import { NavLink } from 'react-router-dom';
import { BookText, BarChart2, Lightbulb, Settings as SettingsIcon, PlusCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const menuItems = [
    { icon: BookText, label: "Journal", to: "/journal" },
    { icon: BarChart2, label: "Insights", to: "/insights" },
    { icon: Lightbulb, label: "Prompts", to: "/prompts" },
    { icon: SettingsIcon, label: "Settings", to: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center p-6">
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white font-serif">Journal</h1>
          </NavLink>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <NavLink to="/journal/new" className="px-4 mb-6 block">
          <Button className="w-full bg-journal-purple hover:bg-journal-deep-purple" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </NavLink>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    isActive
                      ? "flex items-center gap-3 text-sidebar-accent-foreground bg-sidebar-accent rounded-lg py-2 px-3"
                      : "flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg py-2 px-3"
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-center text-sidebar-foreground/70">
          Journal AI Alchemy v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
