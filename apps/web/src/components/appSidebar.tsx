import { Home, Rocket, Compass, Users } from "lucide-react";
import { getSession } from "@/lib/session";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import UserProfile from "./userProfile";
import { redirect } from "next/navigation";

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    variant: "default",
  },
  {
    title: "Friends",
    url: "/friends",
    icon: Users,
    variant: "friends",
  },
  {
    title: "Discover",
    url: "/discover",
    icon: Compass,
    variant: "discover",
  },
  {
    title: "Session",
    url: "/session",
    icon: Rocket,
    variant: "session",
  },
];

export async function AppSidebar() {
  const session = await getSession();

  if (!session) redirect("/auth/signin");

  return (
    <Sidebar className="bg-slate border-r border-wireframe w-64 flex flex-col">
      <SidebarContent className="flex-1 flex flex-col">
        {/* Main Navigation */}
        <SidebarGroup className="mt-1">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="mx-auto px-6" asChild>
                  <Link
                    href={item.url}
                    className={`group flex items-center gap-3 rounded transition-colors ${
                      item.variant === "friends"
                        ? "text-valid"
                        : "text-hologram/90 hover:text-hologram"
                    } hover:bg-hologram hover:text-hologram`}
                  >
                    <item.icon className="w-5 h-5 group-hover:hologram" />
                    <span className="text-inherit group-hover:hologram">
                      {item.title}
                    </span>
                    {item.variant === "nitro" && (
                      <span className="ml-auto text-xs bg-pulse/10 text-pulse px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <UserProfile session={session} />
      </SidebarContent>
    </Sidebar>
  );
}
