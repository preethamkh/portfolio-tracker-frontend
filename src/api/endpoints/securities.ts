/**
 * Securities API Endpoints
 * Maps to: SecuritiesController
 */

import apiClient from "../client";
import {
  Security,
  SecuritySearchResult,
  GetOrCreateSecurityRequest,
} from "@/types";

/**
 * Search securities by symbol or name
 * GET /api/securities/search?query={query}&limit={limit}
 */
export async function searchSecurities(
  query: string,
  limit: number = 10
): Promise<SecuritySearchResult[]> {
  const response = await apiClient.get<SecuritySearchResult[]>(
    "/securities/search",
    {
      params: { query, limit },
    }
  );
  return response.data;
}

/**
 * Get security by ID
 * GET /api/securities/{id}
 */
export async function getSecurity(id: string): Promise<Security> {
  const response = await apiClient.get<Security>(`/securities/${id}`);
  return response.data;
}

/**
 * Get security by symbol
 * GET /api/securities/symbol/{symbol}
 */
export async function getSecurityBySymbol(symbol: string): Promise<Security> {
  const response = await apiClient.get<Security>(
    `/securities/symbol/${symbol}`
  );
  return response.data;
}

/**
 * Get or create security (searches external API if not found locally)
 * POST /api/securities/get-or-create
 */
export async function getOrCreateSecurity(
  data: GetOrCreateSecurityRequest
): Promise<Security> {
  const response = await apiClient.post<Security>(
    "/securities/get-or-create",
    data
  );
  return response.data;
}
