import { Suspense } from "react";
import InvestmentOngoingPage from "@/views/Investment/InvestmentOngoingPage";

export default function OngoingPage() {
  return (
    <Suspense>
      <InvestmentOngoingPage />
    </Suspense>
  );
}
