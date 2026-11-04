"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, Mail, CheckCircle2 } from "lucide-react";
import { DEMO_USERS, DEMO_WORKSPACES } from "@/lib/demo-data";

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("client_member");

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    alert(`Invitation sent to ${inviteEmail} with role '${inviteRole}'. (Resend Capture Mode Active)`);
    setInviteEmail("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-teal/10">
        <div>
          <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
            <Users className="w-6 h-6 text-module-team" /> Team & Client Governance
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Governed agency-workspace links, role assignments, and permission ceilings.
          </p>
        </div>
      </div>

      {/* Invite Member Section */}
      <div className="bg-white p-5 rounded-2xl border border-brand-teal/10 shadow-sm">
        <h3 className="text-sm font-bold text-brand-teal mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-orange" /> Invite Member to Workspace
        </h3>

        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@agency.com or client@company.com"
            className="flex-1 px-3.5 py-2 rounded-lg border border-brand-teal/20 text-xs outline-none focus:border-brand-orange"
            required
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="px-3 py-2 rounded-lg border border-brand-teal/20 text-xs bg-white outline-none"
          >
            <option value="agency_staff">Agency Staff</option>
            <option value="client_admin">Client Admin</option>
            <option value="client_member">Client Member</option>
            <option value="stakeholder">Stakeholder (Read-Only)</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-brand-teal text-white hover:bg-brand-teal/90 text-xs font-bold transition-colors shrink-0"
          >
            Send Invitation
          </button>
        </form>
      </div>

      {/* Members Directory */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-brand-teal">Authorized Workspace Members</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_USERS.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-brand-teal text-brand-seafoam flex items-center justify-center font-bold text-sm shrink-0">
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-brand-teal truncate">{user.name}</h4>
                  <p className="text-xs text-brand-muted truncate">{user.email}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-brand-seafoam/40 text-brand-teal block">
                  {user.role.replace("_", " ")}
                </span>
                <span className="text-[10px] text-brand-muted mt-1 block">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
