"use client";

import React, { useState } from "react";
import {
  Share2,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Calendar,
} from "lucide-react";
import { INITIAL_SOCIAL_POSTS, SocialPost } from "@/lib/demo-data";

export default function SocialFlowPage() {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newChannels, setNewChannels] = useState<string[]>(["linkedin", "x"]);
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  // Approve on Agency Side (e.g. Owner/Staff)
  function handleAgencyApprove(id: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const willBeApproved = Boolean(p.clientApprovedBy);
        return {
          ...p,
          agencyApprovedBy: "Elena Rostova (Agency Owner)",
          agencyApprovedAt: new Date().toISOString(),
          status: willBeApproved ? "approved" : "awaiting_approval",
        };
      })
    );
  }

  // Approve on Client Side (e.g. Client Admin)
  function handleClientApprove(id: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const willBeApproved = Boolean(p.agencyApprovedBy);
        return {
          ...p,
          clientApprovedBy: "Sarah Connor (Client Admin)",
          clientApprovedAt: new Date().toISOString(),
          status: willBeApproved ? "approved" : "awaiting_approval",
        };
      })
    );
  }

  async function handleAiDraftCaption() {
    if (!newTitle.trim()) return;
    setIsAiDrafting(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a compelling enterprise social media caption for LinkedIn and Twitter announcing: "${newTitle}". Include 2 relevant hashtags.`,
        }),
      });
      const data = await res.json();
      if (data.content) setNewContent(data.content);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiDrafting(false);
    }
  }

  function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      workspaceId: "workspace_collab",
      title: newTitle,
      content: newContent,
      channels: newChannels,
      scheduledFor: new Date(Date.now() + 86400000 * 3).toISOString(),
      status: "awaiting_approval",
      author: "Chloe Bennett (Agency Staff)",
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <Share2 className="w-6 h-6 text-module-social" /> SocialFlow Operations
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Editorial planning, channel variants, and strict two-sided human approval quorum.
          </p>
        </div>

        {/* Quorum Policy Banner */}
        <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
          <span>
            <strong>Quorum Rule:</strong> 1 Agency Human + 1 Client Human approval required before dispatch.
          </span>
        </div>
      </div>

      {/* Composer Section */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm">
        <h2 className="text-base font-bold text-brand-teal mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-orange" /> Create New Social Post
        </h2>

        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Post Title / Campaign
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Q4 Milestone Announcement"
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Target Channels
              </label>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {["linkedin", "x", "meta", "instagram", "tiktok"].map((ch) => (
                  <button
                    type="button"
                    key={ch}
                    onClick={() =>
                      setNewChannels((prev) =>
                        prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
                      )
                    }
                    className={`px-3 py-1 rounded-md font-medium uppercase text-[11px] transition-colors ${
                      newChannels.includes(ch)
                        ? "bg-brand-teal text-white"
                        : "bg-brand-ivory text-brand-muted border border-brand-teal/10"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Post Content
              </label>
              <button
                type="button"
                onClick={handleAiDraftCaption}
                disabled={isAiDrafting || !newTitle.trim()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiDrafting ? "Drafting with OpenRouter..." : "Draft with Open-Weight AI"}
              </button>
            </div>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              placeholder="Write the post caption or use AI to draft it based on the title..."
              className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm focus:border-brand-orange outline-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-brand-teal text-white hover:bg-brand-teal/90 px-5 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              Submit for Two-Sided Review
            </button>
          </div>
        </form>
      </div>

      {/* Posts List & Quorum Tracking */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-brand-teal flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-orange" /> Scheduled & In-Review Content
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => {
            const agencyApproved = Boolean(post.agencyApprovedBy);
            const clientApproved = Boolean(post.clientApprovedBy);
            const isFullyApproved = agencyApproved && clientApproved;

            return (
              <div
                key={post.id}
                className="bg-white p-5 rounded-xl border border-brand-teal/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isFullyApproved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isFullyApproved ? "Approved for Dispatch" : "Awaiting Quorum"}
                    </span>
                    <span className="text-xs text-brand-muted">Author: {post.author}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-teal">{post.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{post.content}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.channels.map((ch) => (
                      <span
                        key={ch}
                        className="text-[10px] font-bold uppercase bg-brand-teal/5 text-brand-teal px-2 py-0.5 rounded"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quorum Sign-off Widget */}
                <div className="shrink-0 p-4 rounded-xl bg-brand-ivory/60 border border-brand-teal/10 space-y-3 min-w-[260px]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    Two-Sided Human Quorum
                  </div>

                  {/* Agency Side */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {agencyApproved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                      <span>Agency Side:</span>
                    </div>
                    {agencyApproved ? (
                      <span className="text-[11px] font-bold text-emerald-700">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleAgencyApprove(post.id)}
                        className="px-2.5 py-1 rounded bg-brand-teal text-white hover:bg-brand-teal/80 text-[11px] font-bold"
                      >
                        Sign (Agency)
                      </button>
                    )}
                  </div>

                  {/* Client Side */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-brand-teal/5">
                    <div className="flex items-center gap-1.5">
                      {clientApproved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                      <span>Client Side:</span>
                    </div>
                    {clientApproved ? (
                      <span className="text-[11px] font-bold text-emerald-700">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleClientApprove(post.id)}
                        className="px-2.5 py-1 rounded bg-brand-orange text-brand-teal hover:bg-orange-500 text-[11px] font-bold"
                      >
                        Sign (Client)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
