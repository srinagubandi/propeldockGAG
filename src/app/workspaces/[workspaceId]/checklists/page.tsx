"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { INITIAL_CHECKLISTS, ChecklistRun, ChecklistTask } from "@/lib/demo-data";

export default function ChecklistsPage() {
  const [runs, setRuns] = useState<ChecklistRun[]>(INITIAL_CHECKLISTS);
  const [templatePrompt, setTemplatePrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  function handleToggleTask(runId: string, taskId: string) {
    setRuns((prev) =>
      prev.map((run) => {
        if (run.id !== runId) return run;

        const updatedTasks = run.tasks.map((task) => {
          if (task.id !== taskId) return task;
          const nextStatus: ChecklistTask["status"] =
            task.status === "done" ? "todo" : "done";
          return {
            ...task,
            status: nextStatus,
          };
        });

        const doneCount = updatedTasks.filter((t) => t.status === "done").length;
        const progress = Math.round((doneCount / updatedTasks.length) * 100);

        return {
          ...run,
          tasks: updatedTasks,
          progress,
          status: progress === 100 ? "completed" : "active",
        };
      })
    );
  }

  async function handleAiGenerateSOP() {
    if (!templatePrompt.trim()) return;
    setIsAiGenerating(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Create a 4-step agency-client SOP checklist for: "${templatePrompt}". List each task with assignee role and whether evidence is required.`,
        }),
      });
      const data = await res.json();
      if (data.content) {
        alert(`Generated SOP Template (via DeepSeek-V3):\n\n${data.content}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-module-checklists" /> Checklists & SOP Execution
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Standard operating procedures, task dependency graphs, and audit evidence enforcement.
          </p>
        </div>
      </div>

      {/* AI SOP Template Builder */}
      <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-brand-teal flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-orange" /> Generate New SOP with Open-Weight AI
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Describe a routine workflow (e.g. &ldquo;Client onboarding kickoff&rdquo;) and DeepSeek-V3 will structure the checklist.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={templatePrompt}
            onChange={(e) => setTemplatePrompt(e.target.value)}
            placeholder="e.g. Monthly SEO Audit SOP"
            className="px-3.5 py-1.5 rounded-lg border border-brand-teal/20 text-xs outline-none focus:border-brand-orange w-full md:w-64"
          />
          <button
            onClick={handleAiGenerateSOP}
            disabled={isAiGenerating || !templatePrompt.trim()}
            className="px-4 py-1.5 rounded-lg bg-brand-teal text-brand-seafoam hover:text-white font-bold text-xs shrink-0 disabled:opacity-50"
          >
            {isAiGenerating ? "Generating..." : "Generate SOP"}
          </button>
        </div>
      </div>

      {/* Active Runs */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-brand-teal">Active Runs</h2>

        <div className="space-y-4">
          {runs.map((run) => (
            <div
              key={run.id}
              className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-teal/10 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-seafoam/40 text-brand-teal">
                      {run.category}
                    </span>
                    <span className="text-xs text-brand-muted">Run ID: {run.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-teal mt-1">{run.templateTitle}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-32 bg-brand-teal/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-module-checklists h-2 rounded-full transition-all"
                      style={{ width: `${run.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-module-checklists">{run.progress}% Done</span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5">
                {run.tasks.map((task) => {
                  const isDone = task.status === "done";
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(run.id, task.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isDone
                          ? "bg-emerald-50/50 border-emerald-200 text-brand-muted"
                          : "bg-brand-ivory/30 border-brand-teal/10 hover:border-brand-teal/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                            isDone
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-brand-teal/30 bg-white"
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <span
                            className={`text-sm font-semibold ${
                              isDone ? "line-through text-brand-muted" : "text-brand-teal"
                            }`}
                          >
                            {task.title}
                          </span>
                          <div className="text-[11px] text-brand-muted mt-0.5">
                            Assignee: {task.assignee} · Due: {task.dueDate}
                          </div>
                        </div>
                      </div>

                      {task.evidenceRequired && (
                        <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-teal/5 text-brand-teal flex items-center gap-1">
                          <FileText className="w-3 h-3 text-brand-orange" />
                          <span>{task.evidenceSubmitted ? "Evidence Verified" : "Evidence Required"}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
