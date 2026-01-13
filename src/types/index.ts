/**
 * Barrel export for types
 * This allows: import { User, Portfolio } from '@/types'
 * Instead of: import { User } from '@/types/entities.types'
 */

// TS looks for an index.ts file automatically when importing from a directory

export * from "./entities.types";
export * from "./api.types";
