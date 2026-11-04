"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Filter,
  Sparkles,
  Share2,
  Bug,
  CheckSquare,
  Megaphone,
  Calendar,
} from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"client_facing" | "agency_internal">("client_facing");
  const [isAiSummarizing, setIsAiSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  async function handleGenerateAiSummary() {
    setIsAiSummarizing(true);
    setAiSummary("");

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          prompt: `Generate an executive weekly digest for the Client Workspace:
- SocialFlow: 1 post awaiting client-side approval quorum, 1 approved
- Bug Tracker: 2 open issues, 0 SLA breaches, 100% resolution compliance
- Checklists: SOP run 66% completed with 2 evidence files uploaded
- Updates: Launch Parity v1.0 published
Make the tone professional, concise, reassuring, and highlight immediate action items.`,
        }),
      });
      const data = await res.json();
      if (data.content) setAiSummary(data.content);
    } catch (e: any) {
      setAiSummary(`Failed to generate summary: ${e.message}`);
    } finally {
      setIsAiSummarizing(false);
    }
  }

  function handleExportCsv() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Module,Metric,Status,Value\n" +
      "SocialFlow,Pending Approval,Awaiting Client Quorum,1\n" +
      "SocialFlow,Approved Posts,Ready for Dispatch,1\n" +
      "Bug Tracker,Open Issues,Under SLA Target,2\n" +
      "Checklists,SOP Progress,Active,66%\n" +
      "Updates,Published Releases,Workspace Shared,2\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propeldock_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-orange" /> Reports & Cross-Module Analytics
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Governance metrics, SLA compliance, approval turnaround, and executive exports.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-brand-teal/20 bg-white p-1 text-xs">
            <button
              onClick={() => setReportType("client_facing")}
              className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
                reportType === "client_facing"
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
            >
              Client-Facing View
            </button>
            <button
              onClick={() => setReportType("agency_internal")}
              className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
                reportType === "agency_internal"
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
            >
              Agency-Wide Metrics
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 text-brand-teal font-bold text-xs shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Cross-Module KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase">
            <span>Social Approvals</span>
            <Share2 className="w-4 h-4 text-module-social" />
          </div>
          <div className="text-2xl font-bold text-brand-teal mt-2">1 Pending</div>
          <p className="text-[11px] text-amber-700 mt-1 font-medium">Awaiting Client-Side Quorum</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase">
            <span>SLA Resolution Rate</span>
            <Bug className="w-4 h-4 text-module-bugs" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">100%</div>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">0 Breaches across active P0-P2</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase">
            <span>Checklist Execution</span>
            <CheckSquare className="w-4 h-4 text-module-checklists" />
          </div>
          <div className="text-2xl font-bold text-brand-teal mt-2">66% Done</div>
          <p className="text-[11px] text-brand-muted mt-1">2 Evidence files verified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase">
            <span>Changelog Engagement</span>
            <Megaphone className="w-4 h-4 text-module-updates" />
          </div>
          <div className="text-2xl font-bold text-brand-teal mt-2">2 Published</div>
          <p className="text-[11px] text-brand-muted mt-1">100% workspace read coverage</p>
        </div>
      </div>

      {/* AI Synthesis Section (Meta Llama 3.3 70B on OpenRouter) */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-teal/10 gap-3">
          <div>
            <h3 className="font-bold text-base text-brand-teal flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-orange" /> AI Executive Weekly Digest
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Synthesize cross-module metrics into an executive client brief via Meta Llama 3.3 70B.
            </p>
          </div>
          <button
            onClick={handleGenerateAiSummary}
            disabled={isAiSummarizing}
            className="px-4 py-2 rounded-lg bg-brand-teal text-white hover:bg-brand-teal/90 text-xs font-bold transition-colors disabled:opacity-50"
          >
            {isAiSummarizing ? "Synthesizing with Llama 3.3..." : "Generate Executive Summary"}
          </button>
        </div>

        {aiSummary && (
          <div className="mt-4 p-5 rounded-xl bg-brand-ivory/60 border border-brand-teal/10 text-xs text-brand-teal whitespace-pre-wrap leading-relaxed font-sans">
            {aiSummary}
          </div>
        )}
      </div>
    </div>
  );
}
