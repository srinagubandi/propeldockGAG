import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Sparkles, Database, CheckCircle2 } from "lucide-react";
import { DEMO_USERS, DEMO_WORKSPACES } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-teal flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="border-b border-brand-teal/10 bg-white/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center text-brand-orange font-bold text-xl shadow-sm">
            P
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-brand-teal">Propeldock</span>
            <span className="text-xs block text-brand-muted font-medium">Warm Momentum Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Railway Postgres & OpenRouter Active
          </span>
          <Link
            href="/workspaces/workspace_collab"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-brand-teal font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm text-sm"
          >
            Enter Demo Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/5 text-brand-teal text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-brand-orange" />
          <span>Clean-Slate Launch Parity Specification</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-teal max-w-3xl leading-tight">
          A clearer way to work together.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-brand-muted max-w-2xl">
          Unified collaborative operating system for agencies and their clients.
          Govern social content, change updates, issue tracking, and checklists on a single unified work board.
        </p>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 text-left">
          <div className="p-6 rounded-xl bg-white border border-brand-teal/10 shadow-sm hover:border-brand-teal/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-brand-seafoam/30 flex items-center justify-center text-brand-teal mb-4">
              <ShieldCheck className="w-5 h-5 text-brand-teal" />
            </div>
            <h3 className="text-lg font-bold text-brand-teal">Two-Sided Human Approval</h3>
            <p className="text-sm text-brand-muted mt-2">
              SocialFlow posts require mandatory 1-Agency and 1-Client verification before any automated dispatch can proceed.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-brand-teal/10 shadow-sm hover:border-brand-teal/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-brand-orange mb-4">
              <Sparkles className="w-5 h-5 text-brand-orange" />
            </div>
            <h3 className="text-lg font-bold text-brand-teal">Open-Weight AI Intelligence</h3>
            <p className="text-sm text-brand-muted mt-2">
              Powered strictly by high-tier open-weight models (DeepSeek-V3 and Llama 3.3 70B) via OpenRouter for triage and reporting.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-brand-teal/10 shadow-sm hover:border-brand-teal/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
              <Database className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-brand-teal">Multi-Tenant Isolation</h3>
            <p className="text-sm text-brand-muted mt-2">
              Multi-agency workspace linking with role ceilings, audit logging, and private-by-default visibility semantics.
            </p>
          </div>
        </div>

        {/* Demo Lab 10-Role Quick Switcher */}
        <div className="w-full mt-12 p-8 rounded-2xl bg-white border border-brand-teal/10 shadow-sm text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-brand-teal/10 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
                <Users className="w-6 h-6 text-brand-orange" />
                Permanent Demo Lab Roles
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Test the complete 5-role matrix across desktop and mobile viewports with synthetic enterprise data.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-brand-teal/10 text-brand-teal">
                10 Human Accounts + Super Admin
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {DEMO_USERS.map((user) => (
              <Link
                key={user.id}
                href={`/workspaces/workspace_collab?as=${user.id}`}
                className="group p-4 rounded-xl border border-brand-teal/10 hover:border-brand-orange hover:bg-brand-ivory/40 transition-all flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-brand-orange group-hover:text-brand-teal transition-colors">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-brand-teal truncate group-hover:text-brand-orange transition-colors">
                      {user.name}
                    </span>
                  </div>
                  <div className="text-xs text-brand-muted truncate">{user.email}</div>
                  <span className="mt-2 inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-brand-seafoam/40 text-brand-teal">
                    {user.role.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Workspaces Selection */}
          <div className="mt-8 pt-6 border-t border-brand-teal/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-3">
              Available Demo Workspaces
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_WORKSPACES.map((ws) => (
                <Link
                  key={ws.id}
                  href={`/workspaces/${ws.id}`}
                  className="p-4 rounded-xl border border-brand-teal/10 hover:border-brand-teal/30 bg-brand-ivory/20 flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-brand-teal group-hover:text-brand-orange transition-colors">
                      {ws.name}
                    </h4>
                    <p className="text-xs text-brand-muted mt-0.5">{ws.description}</p>
                    <span className="text-[11px] text-brand-teal font-medium mt-1 inline-block">
                      Linked: {ws.linkedAgencyIds.join(", ")}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-teal/10 bg-white/60 px-6 py-6 text-center text-xs text-brand-muted">
        <p>© 2026 Propeldock. Move work forward. Verified clean-slate platform build.</p>
      </footer>
    </div>
  );
}
