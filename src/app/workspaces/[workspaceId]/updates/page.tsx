"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Sparkles,
  Eye,
  ShieldAlert,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { INITIAL_UPDATES, ChangelogUpdate } from "@/lib/demo-data";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<ChangelogUpdate[]>(INITIAL_UPDATES);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"feature" | "improvement" | "fix" | "announcement">("feature");
  const [visibility, setVisibility] = useState<"workspace_shared" | "agency_shared" | "private_internal">("workspace_shared");
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  async function handleAiDraft() {
    if (!title.trim()) return;
    setIsAiDrafting(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Draft an executive release note summary for a new update titled: "${title}". Make it concise, user-facing, and clear.`,
        }),
      });
      const data = await res.json();
      if (data.content) {
        setSummary(data.content.split("\n")[0] || title);
        setContent(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiDrafting(false);
    }
  }

  function handleCreateUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newUpdate: ChangelogUpdate = {
      id: `upd-${Date.now()}`,
      workspaceId: "workspace_collab",
      title,
      summary: summary || title,
      content,
      category,
      visibility,
      status: "published",
      publishedAt: new Date().toISOString(),
      author: "Sri Nagubandi",
    };

    setUpdates([newUpdate, ...updates]);
    setTitle("");
    setSummary("");
    setContent("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-module-updates" /> Updates & Changelog
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Publish client-safe product releases, internal announcements, and categorized improvements.
          </p>
        </div>
      </div>

      {/* Draft New Update Composer */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm">
        <h2 className="text-base font-bold text-brand-teal mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-orange" /> Draft New Update
        </h2>

        <form onSubmit={handleCreateUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Release Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Real-Time Quorum Tracking & Activity Feed"
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none bg-white"
              >
                <option value="feature">New Feature</option>
                <option value="improvement">Improvement</option>
                <option value="fix">Bug Fix</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
              Audience Visibility (Governed)
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "workspace_shared", label: "Workspace Shared (Client + Agency)" },
                { id: "agency_shared", label: "Agency Only (Private to Agency Staff)" },
                { id: "private_internal", label: "Private Internal (Draft / Restriced)" },
              ].map((vis) => (
                <button
                  type="button"
                  key={vis.id}
                  onClick={() => setVisibility(vis.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    visibility === vis.id
                      ? "bg-brand-teal text-white"
                      : "bg-brand-ivory text-brand-muted border border-brand-teal/10"
                  }`}
                >
                  {vis.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Body & Release Details
              </label>
              <button
                type="button"
                onClick={handleAiDraft}
                disabled={isAiDrafting || !title.trim()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiDrafting ? "Drafting..." : "Generate Notes with DeepSeek-V3"}
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Detail what changed, why it matters, and who is affected..."
              className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-brand-teal text-white hover:bg-brand-teal/90 px-5 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              Publish to Workspace
            </button>
          </div>
        </form>
      </div>

      {/* Published Updates Feed */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-brand-teal">Changelog Feed</h2>

        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="bg-white p-6 rounded-xl border border-brand-teal/10 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-brand-seafoam/40 text-brand-teal">
                    {update.category}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-brand-teal/5 text-brand-muted">
                    {update.visibility.replace("_", " ")}
                  </span>
                </div>
                <div className="text-xs text-brand-muted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {update.publishedAt ? new Date(update.publishedAt).toLocaleDateString() : "Just now"} · {update.author}
                </div>
              </div>

              <h3 className="text-lg font-bold text-brand-teal">{update.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{update.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
