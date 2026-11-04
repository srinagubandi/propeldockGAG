"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Shared Collaboration Workspace");
  const [timezone, setTimezone] = useState("America/New_York (UTC-05:00)");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-brand-teal/10">
        <h1 className="text-2xl font-bold text-brand-teal flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-muted" /> Workspace & Agency Settings
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Configure branding, locale, notification dispatch, and data retention parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Identity */}
        <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-brand-teal flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-orange" /> Workspace Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Workspace Display Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1">
                Workspace Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-brand-teal/20 text-sm bg-white outline-none"
              >
                <option value="America/New_York (UTC-05:00)">America/New_York (UTC-05:00)</option>
                <option value="America/Los_Angeles (UTC-08:00)">America/Los_Angeles (UTC-08:00)</option>
                <option value="Europe/London (UTC+00:00)">Europe/London (UTC+00:00)</option>
                <option value="Asia/Tokyo (UTC+09:00)">Asia/Tokyo (UTC+09:00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Brand Theme */}
        <div className="bg-white p-6 rounded-2xl border border-brand-teal/10 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-brand-teal flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-orange" /> Brand Palette (Warm Momentum)
          </h2>
          <p className="text-xs text-brand-muted">
            The clean-slate visual palette guarantees WCAG 2.2 AA contrast compliance across all viewports.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border border-brand-teal/10 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#123F49] shrink-0"></div>
              <div className="text-xs">
                <div className="font-bold">Deep Teal</div>
                <div className="text-[10px] text-brand-muted">#123F49</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-brand-teal/10 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#F58A2B] shrink-0"></div>
              <div className="text-xs">
                <div className="font-bold">Momentum Orange</div>
                <div className="text-[10px] text-brand-muted">#F58A2B</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-brand-teal/10 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#A9D3C5] shrink-0"></div>
              <div className="text-xs">
                <div className="font-bold">Seafoam</div>
                <div className="text-[10px] text-brand-muted">#A9D3C5</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-brand-teal/10 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#F8F5ED] border shrink-0"></div>
              <div className="text-xs">
                <div className="font-bold">Warm Ivory</div>
                <div className="text-[10px] text-brand-muted">#F8F5ED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-700">Settings saved successfully.</span>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-brand-teal text-white hover:bg-brand-teal/90 text-sm font-bold shadow-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
