export type Role =
  | "super_admin"
  | "agency_owner"
  | "agency_staff"
  | "client_admin"
  | "client_member"
  | "stakeholder";

export type Module =
  | "social"
  | "updates"
  | "bugs"
  | "checklists"
  | "workboard"
  | "reports"
  | "team"
  | "settings"
  | "admin";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: Role;
  agencyId?: string;
  workspaceId?: string;
  isSupportMode?: boolean;
  supportReason?: string;
}

export function canApproveSocialAgency(role: Role): boolean {
  return role === "agency_owner" || role === "agency_staff";
}

export function canApproveSocialClient(role: Role): boolean {
  return role === "client_admin" || role === "client_member";
}

export function canMutateModule(role: Role, module: Module): boolean {
  if (role === "stakeholder") return false;
  if (role === "super_admin" || role === "agency_owner" || role === "client_admin") return true;

  if (role === "agency_staff") {
    return ["social", "updates", "bugs", "checklists", "workboard"].includes(module);
  }

  if (role === "client_member") {
    return ["bugs", "checklists", "workboard"].includes(module);
  }

  return false;
}

export function canAccessModule(role: Role, module: Module): boolean {
  if (role === "super_admin") return true;
  if (module === "admin") return false;
  return true;
}
