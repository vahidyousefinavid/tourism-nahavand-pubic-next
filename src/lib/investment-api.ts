import { InvestmentOpportunity } from '@/types/investment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Fetch all investment opportunities from API
 */
export async function fetchInvestmentOpportunities(): Promise<InvestmentOpportunity[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/investments`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('❌ Error fetching investment opportunities:', error);
    return [];
  }
}

/**
 * Fetch a single investment opportunity by ID
 */
export async function fetchInvestmentOpportunityById(id: string): Promise<InvestmentOpportunity | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/investments/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('❌ Error fetching investment opportunity:', error);
    return null;
  }
}