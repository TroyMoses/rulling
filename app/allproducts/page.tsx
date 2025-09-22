import { DealsGrid } from "@/components/deals-grid";
import { MainLayout } from "@/components/main-layout";

export default function DealsPage() {
  return (
    <MainLayout>
      <DealsGrid />
    </MainLayout>
  );
}

export const metadata = {
  title: "Deals & Promotions - RULLING Gadget Hub",
  description: "Discover amazing deals and promotions on premium products",
};
