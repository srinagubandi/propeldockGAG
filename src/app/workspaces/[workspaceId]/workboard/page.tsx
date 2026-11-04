"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KanbanSquare,
  Filter,
  Share2,
  Bug,
  Megaphone,
  CheckSquare,
  Clock,
  ArrowRight,
} from "lucide-react";
import { INITIAL_WORKBOARD_CARDS, WorkBoardCard } from "@/lib/demo-data";

export default function WorkBoardPage() {
  const [cards, setCards] = useState<WorkBoardCard[]>(INITIAL_WORKBOARD_CARDS);
  const [filterModule, setFilterModule] = useState<string>("all");

  const stages: Array<{ id: WorkBoardCard["stage"]; label: string }> = [
    { id: "todo", label: "To Do" },
    { id: "in_progress", label: "In Progress" },
    { id: "review", label: "Review & Approval" },
    { id: "done", label: "Done" },
  ];

  const filteredCards =
    filterModule === "all"
      ? cards
      : cards.filter((c) => c.sourceModule === filterModule);

  function handleMoveStage(cardId: string, nextStage: WorkBoardCard["stage"]) {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, stage: nextStage } : c))
    );
  }

  function getModuleIcon(module: WorkBoardCard["sourceModule"]) {
    switch (module) {
      case "bugs":
        return <Bug className="w-3.5 h-3.5 text-module-bugs" />;
      case "social":
        return <Share2 className="w-3.5 h-3.5 text-module-social" />;
      case "updates":
        return <Megaphone className="w-3.5 h-3.5 text-module-updates" />;
      case "checklists":
        return <CheckSquare className="w-3.5 h-3.5 text-module-checklists" />;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <KanbanSquare className="w-6 h-6 text-module-workboard" /> Unified Work Board
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Real-time cross-module projection combining Bugs, Updates, SocialFlow, and Checklists.
          </p>
        </div>

        {/* Source Module Filter */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-brand-teal/10 text-xs">
          {["all", "bugs", "social", "updates", "checklists"].map((mod) => (
            <button
              key={mod}
              onClick={() => setFilterModule(mod)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                filterModule === mod
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Projection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {stages.map((stage) => {
          const stageCards = filteredCards.filter((c) => c.stage === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-white/80 rounded-2xl border border-brand-teal/10 p-4 shadow-sm flex flex-col min-h-[500px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-teal/10 mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-brand-teal">
                  {stage.label}
                </span>
                <span className="text-xs bg-brand-teal/10 text-brand-teal font-bold px-2 py-0.5 rounded-full">
                  {stageCards.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {stageCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3.5 rounded-xl bg-brand-ivory/40 border border-brand-teal/10 hover:border-brand-orange hover:shadow-sm transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-brand-teal bg-white px-2 py-0.5 rounded border border-brand-teal/5">
                        {getModuleIcon(card.sourceModule)}
                        <span>{card.sourceModule}</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase text-brand-orange">
                        {card.priority}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-brand-teal leading-snug">
                      {card.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-brand-muted pt-2 border-t border-brand-teal/5">
                      <span>{card.assignee}</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-brand-muted" /> {card.dueDate}
                      </span>
                    </div>

                    {/* Quick Move Stage Select */}
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-brand-muted">Stage:</span>
                      <select
                        value={card.stage}
                        onChange={(e) =>
                          handleMoveStage(card.id, e.target.value as WorkBoardCard["stage"])
                        }
                        className="bg-white border border-brand-teal/10 rounded px-1.5 py-0.5 text-[10px] font-semibold text-brand-teal outline-none"
                      >
                        {stages.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageCards.length === 0 && (
                  <div className="h-32 flex items-center justify-center border-2 border-dashed border-brand-teal/10 rounded-xl text-xs text-brand-muted">
                    No items in {stage.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
