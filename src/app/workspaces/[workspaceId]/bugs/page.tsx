"use client";

import React, { useState } from "react";
import {
  Bug,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Filter,
} from "lucide-react";
import { INITIAL_BUGS, BugIssue } from "@/lib/demo-data";

export default function BugsPage() {
  const [bugs, setBugs] = useState<BugIssue[]>(INITIAL_BUGS);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"critical" | "high" | "medium" | "low">("medium");
  const [priority, setPriority] = useState<"p0" | "p1" | "p2" | "p3">("p2");
  const [assignee, setAssignee] = useState("David Kim (Staff 2)");
  const [isAiTriaging, setIsAiTriaging] = useState(false);

  async function handleAiTriage() {
    if (!title.trim() && !description.trim()) return;
    setIsAiTriaging(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          prompt: `Analyze this bug report and recommend severity (critical/high/medium/low), priority (p0/p1/p2/p3), and likely component.\nTitle: ${title}\nDescription: ${description}`,
        }),
      });
      const data = await res.json();
      if (data.content) {
        alert(`AI Triage Recommendation (via Llama 3.3 70B):\n\n${data.content}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiTriaging(false);
    }
  }

  function handleCreateBug(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newBug: BugIssue = {
      id: `bug-${Date.now()}`,
      workspaceId: "workspace_collab",
      title,
      description,
      severity,
      priority,
      status: "new",
      slaTargetHours: priority === "p0" ? 4 : priority === "p1" ? 12 : 24,
      slaBreached: false,
      reporter: "Sarah Connor (Client Admin 1)",
      assignee,
      createdAt: new Date().toISOString(),
    };

    setBugs([newBug, ...bugs]);
    setTitle("");
    setDescription("");
  }

  function handleStatusChange(id: string, newStatus: BugIssue["status"]) {
    setBugs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <Bug className="w-6 h-6 text-module-bugs" /> Bug & Issue Tracker
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Capture, triage, and resolve defects with SLA tracking and priority workflows.
          </p>
        </div>
      </div>

      {/* Report Bug Form */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm">
        <h2 className="text-base font-bold text-brand-teal mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-orange" /> File New Defect
        </h2>

        <form onSubmit={handleCreateBug} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
              Issue Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken link on client portal export button"
              className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm bg-white outline-none"
              >
                <option value="critical">Critical (Outage / Data Loss)</option>
                <option value="high">High (Major Feature Broken)</option>
                <option value="medium">Medium (Impaired Flow)</option>
                <option value="low">Low (Cosmetic / Minor)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm bg-white outline-none"
              >
                <option value="p0">P0 (Immediate Blocker - 4h SLA)</option>
                <option value="p1">P1 (Urgent - 12h SLA)</option>
                <option value="p2">P2 (Standard - 24h SLA)</option>
                <option value="p3">P3 (Backlog / Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Assignee
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Steps to Reproduce & Expected Behavior
              </label>
              <button
                type="button"
                onClick={handleAiTriage}
                disabled={isAiTriaging || !title.trim()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiTriaging ? "Triaging with Llama 3.3..." : "AI Triage Recommendation"}
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe steps taken, expected result, actual behavior, and environment..."
              className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-brand-teal text-white hover:bg-brand-teal/90 px-5 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              Log Issue to Tracker
            </button>
          </div>
        </form>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-brand-teal">Issue Pipeline</h2>

        <div className="space-y-3">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-white p-5 rounded-xl border border-brand-teal/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                    {bug.priority}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal">
                    {bug.severity}
                  </span>
                  <span className="text-xs text-brand-muted">Reporter: {bug.reporter}</span>
                </div>

                <h3 className="text-base font-bold text-brand-teal">{bug.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{bug.description}</p>

                <div className="flex items-center gap-4 text-xs text-brand-muted pt-1">
                  <span>Assignee: <strong>{bug.assignee}</strong></span>
                  <span className="flex items-center gap-1 text-brand-orange font-semibold">
                    <Clock className="w-3.5 h-3.5" /> SLA Target: {bug.slaTargetHours}h
                  </span>
                </div>
              </div>

              {/* Status Transition Control */}
              <div className="shrink-0 flex items-center gap-2">
                <select
                  value={bug.status}
                  onChange={(e) => handleStatusChange(bug.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-brand-teal/20 text-xs font-bold uppercase bg-brand-ivory text-brand-teal outline-none"
                >
                  <option value="new">New</option>
                  <option value="triaged">Triaged</option>
                  <option value="in_progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
