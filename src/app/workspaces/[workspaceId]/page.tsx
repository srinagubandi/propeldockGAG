"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Share2,
  Bug,
  Megaphone,
  CheckSquare,
} from "lucide-react";
import {
  INITIAL_SOCIAL_POSTS,
  INITIAL_BUGS,
  INITIAL_UPDATES,
  INITIAL_CHECKLISTS,
  SocialPost,
  BugIssue,
} from "@/lib/demo-data";

export default function WorkspaceHomePage() {
  const [socialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [bugs] = useState<BugIssue[]>(INITIAL_BUGS);
  const pendingApprovals = socialPosts.filter((p) => p.status === "awaiting_approval");
  const openBugs = bugs.filter((b) => b.status !== "resolved" && b.status !== "closed");

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleAskAi() {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiOutput("");

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      setAiOutput(data.content || data.error || "Completed.");
    } catch (e: any) {
      setAiOutput(`Failed to contact AI model: ${e.message}`);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Star of the Show: Next Meaningful Action Card */}
      <div className="bg-gradient-to-r from-brand-teal to-[#1c535f] text-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-teal/20 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange text-brand-teal font-bold text-xs uppercase tracking-wider mb-4">
            Next Action Required
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Two-Sided Human Approval Pending
          </h1>
          <p className="mt-2 text-brand-seafoam text-sm md:text-base leading-relaxed">
            Post &ldquo;Q4 Growth Milestone Announcement&rdquo; has been verified by Agency Owner Elena Rostova.
            It is awaiting mandatory Client-side verification before dispatch.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="social"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-brand-teal font-bold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
            >
              Review & Sign Off <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-xs text-brand-seafoam font-medium">
              Quorum: 1 Agency Approver ✓ | 1 Client Approver ⏳
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Key Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pending Approvals Card */}
        <div className="bg-white p-6 rounded-xl border border-brand-teal/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-teal/10">
              <span className="font-bold text-sm text-brand-teal flex items-center gap-2">
                <Share2 className="w-4 h-4 text-module-social" /> SocialFlow Quorum
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                {pendingApprovals.length} Pending
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {pendingApprovals.map((post) => (
                <div key={post.id} className="p-3 rounded-lg bg-brand-ivory/50 border border-brand-teal/5 text-xs">
                  <div className="font-bold text-brand-teal">{post.title}</div>
                  <div className="text-brand-muted mt-1 truncate">{post.content}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-brand-teal font-medium">
                    <span>Agency: {post.agencyApprovedBy ? "✓ Approved" : "⏳ Pending"}</span>
                    <span>Client: {post.clientApprovedBy ? "✓ Approved" : "⏳ Pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="social"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
          >
            Open Social Calendar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Priority Bugs Card */}
        <div className="bg-white p-6 rounded-xl border border-brand-teal/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-teal/10">
              <span className="font-bold text-sm text-brand-teal flex items-center gap-2">
                <Bug className="w-4 h-4 text-module-bugs" /> Active Issues & SLAs
              </span>
              <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                {openBugs.length} Open
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {openBugs.map((bug) => (
                <div key={bug.id} className="p-3 rounded-lg bg-brand-ivory/50 border border-brand-teal/5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-teal truncate">{bug.title}</span>
                    <span className="font-bold uppercase text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      {bug.priority}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-brand-muted">
                    <span>Assignee: {bug.assignee}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-orange" /> {bug.slaTargetHours}h SLA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="bugs"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
          >
            View Bug Tracker <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Checklists Card */}
        <div className="bg-white p-6 rounded-xl border border-brand-teal/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-teal/10">
              <span className="font-bold text-sm text-brand-teal flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-module-checklists" /> Active Checklists
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                1 Run Active
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {INITIAL_CHECKLISTS.map((run) => (
                <div key={run.id} className="p-3 rounded-lg bg-brand-ivory/50 border border-brand-teal/5 text-xs">
                  <div className="font-bold text-brand-teal">{run.templateTitle}</div>
                  <div className="mt-2 w-full bg-brand-teal/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-module-checklists h-2 rounded-full transition-all"
                      style={{ width: `${run.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-brand-muted">
                    <span>{run.tasks.filter((t) => t.status === "done").length} of {run.tasks.length} tasks complete</span>
                    <span className="font-bold text-module-checklists">{run.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="checklists"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
          >
            Open Checklists SOPs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Embedded Open-Weight AI Assistant (DeepSeek-V3 / Llama 3.3 70B via OpenRouter) */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 border-b border-brand-teal/10">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-brand-orange">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-teal">Propeldock Open-Weight AI Assistant</h3>
            <p className="text-xs text-brand-muted">
              Powered by DeepSeek-V3 & Meta Llama 3.3 70B via OpenRouter. Draft updates, triage bugs, or summarize status.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. 'Draft a client changelog update about the two-sided approval launch' or 'Triage bug-201'"
              className="flex-1 px-4 py-2.5 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-brand-ivory/20"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAskAi();
              }}
            />
            <button
              onClick={handleAskAi}
              disabled={isGenerating || !aiPrompt.trim()}
              className="px-5 py-2.5 rounded-lg bg-brand-teal text-brand-seafoam hover:text-white font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {isGenerating ? "Reasoning..." : "Generate"}
            </button>
          </div>

          {aiOutput && (
            <div className="p-4 rounded-xl bg-brand-ivory/60 border border-brand-teal/10 text-xs text-brand-teal whitespace-pre-wrap font-sans leading-relaxed">
              <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-2">
                Response from OpenRouter (Open-Weight Model):
              </div>
              {aiOutput}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
