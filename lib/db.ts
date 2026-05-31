import "server-only";

import type { Pool, QueryResultRow } from "pg";

let pool: Pool | undefined;

export function getDbPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for database access.");
  }

  if (!pool) {
    const pg = loadPg();
    pool = new pg.Pool({ connectionString });
  }

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[]) {
  return getDbPool().query<T>(text, params);
}

function loadPg(): typeof import("pg") {
  const runtimeRequire = eval("require") as NodeRequire;
  return runtimeRequire("pg");
}
