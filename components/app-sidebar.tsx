"use client";

import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sourceNames } from "@/lib/sources";

interface AppSidebarProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function AppSidebar({ selectedIndex, onSelect }: AppSidebarProps) {
  const { theme, setTheme } = useTheme();
  const { setOpenMobile } = useSidebar();

  const handleSelect = (index: number) => {
    onSelect(index);
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-border border-r">
      <SidebarHeader className="px-4 py-3">
        <span className="font-serif text-2xl font-medium">
          Hydroxide Compiler
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs tracking-wider uppercase">
            Examples
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sourceNames.map((name, index) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    isActive={selectedIndex === index}
                    onClick={() => handleSelect(index)}
                  >
                    <span>{name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-border border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="https://github.com/hydroxide-js/hydroxide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span>Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
