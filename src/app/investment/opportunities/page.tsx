import { Suspense } from "react";
import InvestmentOpportunitiesPage from "@/views/Investment/InvestmentOpportunitiesPage";

export default function InvestmentOpportunities() {
  return (
    <Suspense>
      <InvestmentOpportunitiesPage />
    </Suspense>
  );
}