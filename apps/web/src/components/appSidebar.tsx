import {
  Home,
  Search,
  Settings,
  User,
  Mic,
  Headphones,
  MoreHorizontal,
  Rocket,
  Compass,
  Zap,
  Users,
} from "lucide-react";
import { getSession } from "@/lib/session";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

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
    title: "Nitro",
    url: "/nitro",
    icon: Zap,
    variant: "nitro",
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

const serverItems = [
  {
    id: "nexus-main",
    name: "Nexus Main",
    initial: "N",
    color: "text-neon",
  },
  {
    id: "gaming",
    name: "Gaming Hub",
    initial: "G",
    color: "text-pulse",
  },
  {
    id: "developers",
    name: "Dev Lounge",
    initial: "D",
    color: "text-valid",
  },
];

const directMessages = [
  {
    id: "user1",
    name: "Alex Johnson",
    status: "online",
  },
  {
    id: "user2",
    name: "Sam Wilson",
    status: "idle",
  },
  {
    id: "user3",
    name: "Taylor Smith",
    status: "dnd",
  },
];

export async function AppSidebar() {
  const session = await getSession();

  return (
    <Sidebar className="bg-slate border-r border-wireframe w-64 flex flex-col">
      <SidebarContent className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-3 border-b border-wireframe">
          <div className="relative">
            <Search className="w-4 h-4 text-static absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find or start a conversation"
              className="w-full bg-matrix text-hologram text-sm rounded px-3 pl-9 py-1.5 focus:outline-none focus:ring-1 focus:ring-neon/50"
            />
          </div>
        </div>

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
                        : item.variant === "nitro"
                          ? "text-pulse hover:text-pulse"
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

        {/* Server List */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-static/80 px-4 text-xs font-semibold tracking-wider">
            SERVERS
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            {serverItems.map((server) => (
              <div
                key={server.id}
                className="flex items-center px-4 py-2 mx-2 rounded hover:bg-wireframe/30 cursor-pointer group"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-matrix flex items-center justify-center font-bold text-sm ${server.color}`}
                >
                  {server.initial}
                </div>
                <span className="ml-2 text-hologram/90">{server.name}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                  <button className="text-static hover:text-hologram">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Direct Messages */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-static/80 px-4 text-xs font-semibold tracking-wider">
            DIRECT MESSAGES
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            {directMessages.map((user) => (
              <div
                key={user.id}
                className="flex items-center px-4 py-1.5 mx-2 rounded hover:bg-wireframe/30 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-matrix flex items-center justify-center text-hologram/90">
                    {user.name.charAt(0)}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate ${
                      user.status === "online"
                        ? "bg-valid"
                        : user.status === "idle"
                          ? "bg-ale"
                          : "bg-alert"
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-hologram/90">{user.name}</span>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile - Bottom */}
        <div className="mt-auto p-2 bg-matrix/50 border-t border-wireframe">
          <div className="flex items-center gap-2 p-1.5 rounded hover:bg-wireframe/30">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon">
                <User className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate bg-valid"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate text-hologram">
                {session?.user?.name || "Guest"}
              </div>
              <div className="text-xs truncate text-static">
                #{session?.user?.id}
              </div>
            </div>
            <div className="flex gap-1 text-static">
              <button className="hover:text-hologram p-1">
                <Mic className="w-4 h-4" />
              </button>
              <button className="hover:text-hologram p-1">
                <Headphones className="w-4 h-4" />
              </button>
              <button className="hover:text-hologram p-1">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
