import { Suspense } from "react";
import InvestmentAtlasPage from "@/views/Investment/InvestmentAtlasPage";

export default function AtlasPage() {
  return (
    <Suspense>
      <InvestmentAtlasPage />
    </Suspense>
  );
}
