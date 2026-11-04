"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Home,
  Megaphone,
  Bug,
  Share2,
  CheckSquare,
  KanbanSquare,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { DEMO_USERS, DEMO_WORKSPACES, DemoUser } from "@/lib/demo-data";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [workspaceId, setWorkspaceId] = useState<string>("workspace_collab");
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS[0]); // default Sri Nagubandi
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  useEffect(() => {
    params.then((p) => {
      if (p.workspaceId) setWorkspaceId(p.workspaceId);
    });
  }, [params]);

  useEffect(() => {
    const asUserId = searchParams.get("as");
    if (asUserId) {
      const found = DEMO_USERS.find((u) => u.id === asUserId);
      if (found) setCurrentUser(found);
    }
  }, [searchParams]);

  const currentWorkspace =
    DEMO_WORKSPACES.find((w) => w.id === workspaceId) || DEMO_WORKSPACES[0];

  const navItems = [
    { name: "Home", href: `/workspaces/${workspaceId}`, icon: Home },
    { name: "Updates", href: `/workspaces/${workspaceId}/updates`, icon: Megaphone },
    { name: "Bugs", href: `/workspaces/${workspaceId}/bugs`, icon: Bug },
    { name: "SocialFlow", href: `/workspaces/${workspaceId}/social`, icon: Share2 },
    { name: "Checklists", href: `/workspaces/${workspaceId}/checklists`, icon: CheckSquare },
    { name: "Work Board", href: `/workspaces/${workspaceId}/workboard`, icon: KanbanSquare },
    { name: "Reports", href: `/workspaces/${workspaceId}/reports`, icon: BarChart3 },
    { name: "Team & Clients", href: `/workspaces/${workspaceId}/team`, icon: Users },
    { name: "Settings", href: `/workspaces/${workspaceId}/settings`, icon: Settings },
  ];

  if (currentUser.role === "super_admin") {
    navItems.push({
      name: "Super Admin",
      href: `/admin`,
      icon: ShieldAlert,
    });
  }

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col md:flex-row text-brand-teal">
      {/* Support Mode Persistent Banner if Super Admin */}
      {currentUser.role === "super_admin" && (
        <div className="w-full bg-brand-teal text-brand-seafoam text-xs px-4 py-1.5 flex items-center justify-between font-medium fixed top-0 left-0 right-0 z-50 shadow">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-orange animate-pulse" />
            <span>
              <strong>SUPER ADMIN AUDITED SESSION:</strong> Sri Nagubandi viewing{" "}
              {currentWorkspace.name}
            </span>
          </div>
          <span className="bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            Read-Only Guard Active
          </span>
        </div>
      )}

      {/* Desktop Destination Rail (>= 1024px) */}
      <aside className={`w-64 bg-white border-r border-brand-teal/10 flex flex-col justify-between shrink-0 fixed md:sticky ${currentUser.role === "super_admin" ? "top-7" : "top-0"} h-[calc(100vh-${currentUser.role === "super_admin" ? "28px" : "0px"})] z-40 transition-transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div>
          {/* Logo & Workspace Brand */}
          <div className="p-5 border-b border-brand-teal/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-teal text-brand-orange font-bold flex items-center justify-center text-lg">
                P
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-brand-teal block">Propeldock</span>
                <span className="text-[11px] text-brand-muted font-medium truncate block max-w-[140px]">
                  {currentWorkspace.name}
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 rounded hover:bg-brand-teal/5 text-brand-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === `/workspaces/${workspaceId}`
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={`${item.href}?as=${currentUser.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-teal text-white font-semibold shadow-sm"
                      : "text-brand-muted hover:text-brand-teal hover:bg-brand-ivory/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-orange" : "text-brand-muted"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Identity & Demo Role Switcher at Bottom */}
        <div className="p-4 border-t border-brand-teal/10 relative bg-brand-ivory/30">
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center justify-between">
            <span>Active Persona</span>
            <span className="text-[10px] text-brand-orange font-semibold">Demo Lab</span>
          </div>

          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-brand-teal/10 hover:border-brand-teal/30 text-left transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-brand-teal text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-brand-teal truncate">{currentUser.name}</div>
                <div className="text-[10px] text-brand-muted uppercase font-medium">{currentUser.role.replace("_", " ")}</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-brand-muted shrink-0" />
          </button>

          {/* Role Dropdown */}
          {roleMenuOpen && (
            <div className="absolute bottom-16 left-3 right-3 bg-white rounded-xl shadow-xl border border-brand-teal/15 p-2 max-h-80 overflow-y-auto z-50">
              <div className="text-[10px] font-bold text-brand-muted px-2 py-1 uppercase tracking-wider">
                Switch Role Account
              </div>
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setCurrentUser(u);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2 hover:bg-brand-ivory/60 transition-colors ${
                    u.id === currentUser.id ? "bg-brand-teal/5 font-bold" : ""
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-bold flex items-center justify-center shrink-0">
                    {u.avatar}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-brand-teal">{u.name}</div>
                    <div className="text-[10px] text-brand-muted capitalize">{u.role.replace("_", " ")}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${currentUser.role === "super_admin" ? "mt-7" : ""}`}>
        {/* Top Header Bar for Mobile & Search/Actions */}
        <header className="h-14 border-b border-brand-teal/10 bg-white/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 md:top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg border border-brand-teal/10 text-brand-teal"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-brand-teal capitalize">
              {pathname.split("/").pop() || "Home"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-brand-seafoam/30 text-brand-teal font-medium">
              Workspace: {currentWorkspace.slug}
            </span>
            <Link
              href="/"
              className="px-3 py-1 rounded border border-brand-teal/20 text-brand-teal font-medium hover:bg-brand-teal hover:text-white transition-colors"
            >
              Exit to Portal
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
