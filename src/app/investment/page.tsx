import { Suspense } from "react";
import InvestmentGuidePage from "@/views/Investment/InvestmentGuidePage";

export default function InvestmentPage() {
  return (
    <Suspense>
      <InvestmentGuidePage />
    </Suspense>
  );
}