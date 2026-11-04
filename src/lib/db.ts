import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const dbPool = connectionString
  ? new Pool({
      connectionString,
      ssl: connectionString.includes("railway.internal")
        ? false
        : { rejectUnauthorized: false },
    })
  : null;

export async function query(text: string, params?: any[]) {
  if (!dbPool) {
    return null;
  }
  const client = await dbPool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initDbSchema() {
  if (!dbPool) return;

  const createTablesSql = `
    CREATE TABLE IF NOT EXISTS platform_audit_logs (
      id VARCHAR(64) PRIMARY KEY,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      actor VARCHAR(128) NOT NULL,
      actor_role VARCHAR(64) NOT NULL,
      action VARCHAR(128) NOT NULL,
      target_type VARCHAR(64) NOT NULL,
      target_id VARCHAR(64) NOT NULL,
      scope VARCHAR(64) NOT NULL,
      decision VARCHAR(16) NOT NULL,
      reason TEXT
    );

    CREATE TABLE IF NOT EXISTS social_posts (
      id VARCHAR(64) PRIMARY KEY,
      workspace_id VARCHAR(64) NOT NULL,
      title VARCHAR(256) NOT NULL,
      content TEXT NOT NULL,
      channels TEXT[] NOT NULL,
      scheduled_for TIMESTAMP WITH TIME ZONE,
      status VARCHAR(32) NOT NULL,
      agency_approved_by VARCHAR(128),
      agency_approved_at TIMESTAMP WITH TIME ZONE,
      client_approved_by VARCHAR(128),
      client_approved_at TIMESTAMP WITH TIME ZONE,
      author VARCHAR(128) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bug_issues (
      id VARCHAR(64) PRIMARY KEY,
      workspace_id VARCHAR(64) NOT NULL,
      title VARCHAR(256) NOT NULL,
      description TEXT NOT NULL,
      severity VARCHAR(32) NOT NULL,
      priority VARCHAR(32) NOT NULL,
      status VARCHAR(32) NOT NULL,
      sla_target_hours INT NOT NULL,
      sla_breached BOOLEAN DEFAULT FALSE,
      reporter VARCHAR(128) NOT NULL,
      assignee VARCHAR(128) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS changelog_updates (
      id VARCHAR(64) PRIMARY KEY,
      workspace_id VARCHAR(64) NOT NULL,
      title VARCHAR(256) NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(32) NOT NULL,
      visibility VARCHAR(32) NOT NULL,
      status VARCHAR(32) NOT NULL,
      published_at TIMESTAMP WITH TIME ZONE,
      author VARCHAR(128) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(createTablesSql);
    console.log("PostgreSQL schema verification completed.");
  } catch (err) {
    console.warn("Notice: Database initialization deferred or schema already current:", err);
  }
}
