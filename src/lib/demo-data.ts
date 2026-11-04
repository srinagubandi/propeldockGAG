import { Role } from "./permissions";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  agencyId?: string;
  workspaceId?: string;
  avatar: string;
}

export interface DemoWorkspace {
  id: string;
  name: string;
  slug: string;
  linkedAgencyIds: string[];
  description: string;
}

export interface DemoAgency {
  id: string;
  name: string;
  slug: string;
}

export const DEMO_AGENCIES: DemoAgency[] = [
  { id: "agency_north", name: "Demo Agency North", slug: "agency-north" },
  { id: "agency_south", name: "Demo Agency South", slug: "agency-south" },
];

export const DEMO_WORKSPACES: DemoWorkspace[] = [
  {
    id: "workspace_collab",
    name: "Shared Collaboration Workspace",
    slug: "shared-collab",
    linkedAgencyIds: ["agency_north", "agency_south"],
    description: "Multi-agency shared workspace for cross-functional campaigns and product operations.",
  },
  {
    id: "workspace_north",
    name: "North Single-Agency Workspace",
    slug: "north-private",
    linkedAgencyIds: ["agency_north"],
    description: "Private operational workspace strictly isolated to Demo Agency North.",
  },
];

export const DEMO_USERS: DemoUser[] = [
  { id: "usr_super", name: "Sri Nagubandi", email: "sri@srinagubandi.com", role: "super_admin", avatar: "SN" },
  { id: "usr_owner1", name: "Elena Rostova (Owner 1)", email: "owner1@demo.propeldock.com", role: "agency_owner", agencyId: "agency_north", avatar: "ER" },
  { id: "usr_owner2", name: "Marcus Sterling (Owner 2)", email: "owner2@demo.propeldock.com", role: "agency_owner", agencyId: "agency_south", avatar: "MS" },
  { id: "usr_staff1", name: "Chloe Bennett (Staff 1)", email: "staff1@demo.propeldock.com", role: "agency_staff", agencyId: "agency_north", avatar: "CB" },
  { id: "usr_staff2", name: "David Kim (Staff 2)", email: "staff2@demo.propeldock.com", role: "agency_staff", agencyId: "agency_south", avatar: "DK" },
  { id: "usr_cadmin1", name: "Sarah Connor (Client Admin 1)", email: "clientadmin1@demo.propeldock.com", role: "client_admin", workspaceId: "workspace_collab", avatar: "SC" },
  { id: "usr_cadmin2", name: "Tom Vance (Client Admin 2)", email: "clientadmin2@demo.propeldock.com", role: "client_admin", workspaceId: "workspace_collab", avatar: "TV" },
  { id: "usr_cmember1", name: "Alice Zhang (Client Member 1)", email: "clientmember1@demo.propeldock.com", role: "client_member", workspaceId: "workspace_collab", avatar: "AZ" },
  { id: "usr_cmember2", name: "Brian O'Connor (Client Member 2)", email: "clientmember2@demo.propeldock.com", role: "client_member", workspaceId: "workspace_collab", avatar: "BO" },
  { id: "usr_stake1", name: "Rebecca Hall (Stakeholder 1)", email: "stakeholder1@demo.propeldock.com", role: "stakeholder", workspaceId: "workspace_collab", avatar: "RH" },
  { id: "usr_stake2", name: "James Wilson (Stakeholder 2)", email: "stakeholder2@demo.propeldock.com", role: "stakeholder", workspaceId: "workspace_collab", avatar: "JW" },
];

export interface SocialPost {
  id: string;
  workspaceId: string;
  title: string;
  content: string;
  channels: string[];
  scheduledFor: string;
  status: "draft" | "awaiting_approval" | "approved" | "scheduled" | "published" | "failed";
  agencyApprovedBy?: string;
  agencyApprovedAt?: string;
  clientApprovedBy?: string;
  clientApprovedAt?: string;
  author: string;
}

export interface BugIssue {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  priority: "p0" | "p1" | "p2" | "p3";
  status: "new" | "triaged" | "in_progress" | "blocked" | "in_review" | "resolved" | "closed";
  slaTargetHours: number;
  slaBreached: boolean;
  reporter: string;
  assignee: string;
  createdAt: string;
}

export interface ChangelogUpdate {
  id: string;
  workspaceId: string;
  title: string;
  summary: string;
  content: string;
  category: "feature" | "improvement" | "fix" | "announcement";
  visibility: "workspace_shared" | "agency_shared" | "private_internal";
  status: "draft" | "in_review" | "published";
  publishedAt?: string;
  author: string;
}

export interface ChecklistTask {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done" | "blocked";
  evidenceRequired: boolean;
  evidenceSubmitted?: string;
  assignee: string;
  dueDate: string;
}

export interface ChecklistRun {
  id: string;
  workspaceId: string;
  templateTitle: string;
  category: string;
  status: "active" | "completed" | "paused";
  tasks: ChecklistTask[];
  progress: number;
}

export interface WorkBoardCard {
  id: string;
  workspaceId: string;
  sourceModule: "bugs" | "updates" | "social" | "checklists";
  sourceId: string;
  title: string;
  stage: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  scope: string;
  decision: "ALLOW" | "DENY";
  reason?: string;
}

// Initial in-memory synthetic state for the Demo Lab
export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-101",
    workspaceId: "workspace_collab",
    title: "Q4 Growth Milestone Announcement",
    content: "We are thrilled to announce 40% QoQ growth with our flagship enterprise clients! #Milestones #Growth",
    channels: ["linkedin", "x", "meta"],
    scheduledFor: "2026-11-10T14:00:00Z",
    status: "awaiting_approval",
    agencyApprovedBy: "Elena Rostova (Owner 1)",
    agencyApprovedAt: "2026-11-03T18:30:00Z",
    clientApprovedBy: undefined,
    author: "Chloe Bennett (Staff 1)",
  },
  {
    id: "post-102",
    workspaceId: "workspace_collab",
    title: "Product Feature Spotlight: Unified Work Board",
    content: "A clearer way to work together. Explore how Propeldock unifies tasks across every client stream.",
    channels: ["linkedin", "instagram"],
    scheduledFor: "2026-11-12T16:00:00Z",
    status: "approved",
    agencyApprovedBy: "Elena Rostova (Owner 1)",
    agencyApprovedAt: "2026-11-02T11:00:00Z",
    clientApprovedBy: "Sarah Connor (Client Admin 1)",
    clientApprovedAt: "2026-11-02T15:20:00Z",
    author: "Elena Rostova (Owner 1)",
  },
];

export const INITIAL_BUGS: BugIssue[] = [
  {
    id: "bug-201",
    workspaceId: "workspace_collab",
    title: "Media preview aspect ratio clipping on mobile viewport",
    description: "When viewing SocialFlow video thumbnails below 480px, the 16:9 box crops prematurely.",
    severity: "medium",
    priority: "p2",
    status: "in_progress",
    slaTargetHours: 24,
    slaBreached: false,
    reporter: "Sarah Connor (Client Admin 1)",
    assignee: "David Kim (Staff 2)",
    createdAt: "2026-11-03T10:00:00Z",
  },
  {
    id: "bug-202",
    workspaceId: "workspace_collab",
    title: "Checklist dependency unlock failure after upstream reopen",
    description: "Reopening Task 1 did not dynamically relock dependent Task 2 in Safari 19.",
    severity: "high",
    priority: "p1",
    status: "triaged",
    slaTargetHours: 12,
    slaBreached: false,
    reporter: "Alice Zhang (Client Member 1)",
    assignee: "Chloe Bennett (Staff 1)",
    createdAt: "2026-11-03T14:15:00Z",
  },
];

export const INITIAL_UPDATES: ChangelogUpdate[] = [
  {
    id: "upd-301",
    workspaceId: "workspace_collab",
    title: "Propeldock Launch Parity Release v1.0",
    summary: "Complete clean-slate foundation uniting SocialFlow, Changelog, Bug Tracker, and Checklists.",
    content: "Full release with multi-tenant agency governance, immutable audit logging, and open-weight AI agents.",
    category: "feature",
    visibility: "workspace_shared",
    status: "published",
    publishedAt: "2026-11-04T00:00:00Z",
    author: "Sri Nagubandi",
  },
  {
    id: "upd-302",
    workspaceId: "workspace_collab",
    title: "Two-Sided Human Approval Quorum Protocol",
    summary: "SocialFlow posts now require explicit 1-Agency and 1-Client verification.",
    content: "Machine agents and single-party approvals can no longer bypass publication policy.",
    category: "improvement",
    visibility: "workspace_shared",
    status: "published",
    publishedAt: "2026-11-03T21:00:00Z",
    author: "Elena Rostova",
  },
];

export const INITIAL_CHECKLISTS: ChecklistRun[] = [
  {
    id: "chk-401",
    workspaceId: "workspace_collab",
    templateTitle: "Weekly Campaign Launch Readiness SOP",
    category: "Operations",
    status: "active",
    progress: 66,
    tasks: [
      { id: "t-1", title: "Copy & Creative Asset Review", status: "done", evidenceRequired: true, evidenceSubmitted: "asset_manifest_v2.pdf", assignee: "Chloe Bennett", dueDate: "2026-11-03" },
      { id: "t-2", title: "Client Brand Alignment Sign-off", status: "done", evidenceRequired: true, evidenceSubmitted: "brand_check.png", assignee: "Sarah Connor", dueDate: "2026-11-03" },
      { id: "t-3", title: "Two-Sided Quorum Approval Verification", status: "in_progress", evidenceRequired: false, assignee: "Elena Rostova", dueDate: "2026-11-05" },
    ],
  },
];

export const INITIAL_WORKBOARD_CARDS: WorkBoardCard[] = [
  { id: "wb-1", workspaceId: "workspace_collab", sourceModule: "bugs", sourceId: "bug-202", title: "Checklist dependency unlock failure", stage: "todo", priority: "high", assignee: "Chloe Bennett", dueDate: "Nov 5" },
  { id: "wb-2", workspaceId: "workspace_collab", sourceModule: "social", sourceId: "post-101", title: "Q4 Growth Milestone Announcement", stage: "review", priority: "medium", assignee: "Elena Rostova", dueDate: "Nov 10" },
  { id: "wb-3", workspaceId: "workspace_collab", sourceModule: "checklists", sourceId: "chk-401", title: "Weekly Campaign Launch SOP", stage: "in_progress", priority: "high", assignee: "David Kim", dueDate: "Nov 5" },
  { id: "wb-4", workspaceId: "workspace_collab", sourceModule: "updates", sourceId: "upd-301", title: "Propeldock Launch Parity v1.0", stage: "done", priority: "low", assignee: "Sri Nagubandi", dueDate: "Nov 4" },
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  { id: "aud-001", timestamp: "2026-11-04T01:45:00Z", actor: "Sri Nagubandi", actorRole: "super_admin", action: "platform.bootstrap.completed", targetType: "platform", targetId: "propeldock", scope: "platform", decision: "ALLOW" },
  { id: "aud-002", timestamp: "2026-11-03T18:30:00Z", actor: "Elena Rostova", actorRole: "agency_owner", action: "social.post.approval.agency", targetType: "social_post", targetId: "post-101", scope: "workspace_collab", decision: "ALLOW", reason: "Agency side verified" },
  { id: "aud-003", timestamp: "2026-11-03T14:15:00Z", actor: "Alice Zhang", actorRole: "client_member", action: "bugs.issue.created", targetType: "bug_issue", targetId: "bug-202", scope: "workspace_collab", decision: "ALLOW" },
];
