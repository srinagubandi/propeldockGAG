"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Database,
  Users,
  Search,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
} from "lucide-react";
import { INITIAL_AUDIT_LOGS, AuditEvent, DEMO_AGENCIES, DEMO_WORKSPACES } from "@/lib/demo-data";

export default function SuperAdminPage() {
  const [auditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [supportModeElevation, setSupportModeElevation] = useState(false);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-teal p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-teal/10 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/workspaces/workspace_collab"
            className="p-2 rounded-lg bg-white border border-brand-teal/10 hover:border-brand-teal/30 text-brand-teal transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-brand-orange" /> Super Admin Control Plane
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              Platform governance, immutable audit explorer, and support session isolation for Sri Nagubandi (sri@srinagubandi.com).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Railway Postgres Verified
          </span>
        </div>
      </div>

      {/* Support Mode Elevation Controls */}
      <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-brand-teal flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-orange" /> Governed Support Session Mode
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Support sessions into tenant workspaces start as <strong>Read-Only by default</strong>. Write elevation requires explicit administrative reauthentication.
          </p>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer bg-brand-ivory/60 p-2.5 rounded-xl border border-brand-teal/10 text-xs font-bold text-brand-teal">
          <input
            type="checkbox"
            checked={supportModeElevation}
            onChange={(e) => setSupportModeElevation(e.target.checked)}
            className="w-4 h-4 text-brand-orange rounded border-brand-teal/30 focus:ring-brand-orange"
          />
          <span>Enable Write Elevation (High-Impact Guard)</span>
        </label>
      </div>

      {/* Platform Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="text-xs text-brand-muted font-bold uppercase">Agencies Configured</div>
          <div className="text-2xl font-bold text-brand-teal mt-1">{DEMO_AGENCIES.length}</div>
          <p className="text-[11px] text-brand-muted mt-1">Demo Agency North & South</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="text-xs text-brand-muted font-bold uppercase">Workspaces Active</div>
          <div className="text-2xl font-bold text-brand-teal mt-1">{DEMO_WORKSPACES.length}</div>
          <p className="text-[11px] text-brand-muted mt-1">Shared Collab + North Private</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
          <div className="text-xs text-brand-muted font-bold uppercase">Open-Weight AI Status</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">Ready</div>
          <p className="text-[11px] text-brand-muted mt-1">DeepSeek-V3 & Llama 3.3 70B</p>
        </div>
      </div>

      {/* Immutable Audit Log Explorer */}
      <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-teal/10 gap-3">
          <div>
            <h2 className="text-base font-bold text-brand-teal">Platform Immutable Audit Explorer</h2>
            <p className="text-xs text-brand-muted">
              Append-only audit record tracking every security, approval, mutation, and support session event.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit trail..."
              className="pl-9 pr-4 py-1.5 rounded-lg border border-brand-teal/20 text-xs outline-none focus:border-brand-orange w-64"
            />
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-teal/10 text-brand-muted font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Target</th>
                <th className="py-2.5 px-3">Scope</th>
                <th className="py-2.5 px-3">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-brand-muted">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-brand-teal">{log.actor}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-brand-teal/5 font-semibold text-[10px] uppercase">
                      {log.actorRole.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-brand-teal">{log.action}</td>
                  <td className="py-2.5 px-3 text-brand-muted">{log.targetType}: {log.targetId}</td>
                  <td className="py-2.5 px-3 text-brand-muted">{log.scope}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {log.decision}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
