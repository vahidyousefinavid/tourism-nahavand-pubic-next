import { Suspense } from "react";
import InvestmentSuggestPage from "@/views/Investment/InvestmentSuggestPage";

export default function SuggestPage() {
  return (
    <Suspense>
      <InvestmentSuggestPage />
    </Suspense>
  );
}
