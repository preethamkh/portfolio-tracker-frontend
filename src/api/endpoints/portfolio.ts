/**
 * Portfolio-related API endpoint functions
 * Maps to: .NET Controller: PortfolioController
 */

import apiClient from "../client";
import {
  Portfolio as Portfolio,
  CreatePortfolioDto,
  UpdatePortfolioDto,
} from "@/types";

/**
 * Get all portfolios for the authenticated user.
 *
 * GET /api/users/{userID}/portfolios
 */
export async function getUserPortfolios(userId: string): Promise<Portfolio[]> {
  const response = await apiClient.get<Portfolio[]>(
    `/users/${userId}/portfolios`,
  );
  return response.data;
}

/**
 * Get a specific portfolio by ID.
 *
 * GET /api/users/{userID}/portfolios/{portfolioID}
 */
export async function getPortfolioById(
  userId: string,
  portfolioId: string,
): Promise<Portfolio> {
  const response = await apiClient.get<Portfolio>(
    `/users/${userId}/portfolios/${portfolioId}`,
  );
  return response.data;
}

/**
 * Create a new portfolio
 * POST /api/users/{userId}/portfolios
 */
export async function createPortfolio(
  userId: string,
  data: CreatePortfolioDto,
): Promise<Portfolio> {
  const response = await apiClient.post<Portfolio>(
    `/users/${userId}/portfolios`,
    data,
  );
  return response.data;
}

/**
 * Update a portfolio
 * PUT /api/users/{userId}/portfolios/{portfolioId}
 */
export async function updatePortfolio(
  userId: string,
  portfolioId: string,
  data: UpdatePortfolioDto,
): Promise<Portfolio> {
  const response = await apiClient.put<Portfolio>(
    `/users/${userId}/portfolios/${portfolioId}`,
    data,
  );
  return response.data;
}

/**
 * Delete a portfolio
 * DELETE /api/users/{userId}/portfolios/{portfolioId}
 */
export async function deletePortfolio(
  userId: string,
  portfolioId: string,
): Promise<void> {
  await apiClient.delete(`/users/${userId}/portfolios/${portfolioId}`);
}

/**
 * Set a portfolio as default
 * PUT /api/users/{userId}/portfolios/{portfolioId}/set-default
 */
// todo: got me thinking, if I should swap to PATCH instead of PUT for partial updates?!
// ideal PATCH, not PUT (which implies full replacement), but backend is currently using PUT
export async function setDefaultPortfolio(
  userId: string,
  portfolioId: string,
): Promise<void> {
  await apiClient.put(`/users/${userId}/portfolios/${portfolioId}/set-default`);
}
