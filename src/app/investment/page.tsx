import { Suspense } from "react";
import InvestmentHubPage from "@/views/Investment/InvestmentHubPage";

export default function InvestmentPage() {
  return (
    <Suspense>
      <InvestmentHubPage />
    </Suspense>
  );
}
