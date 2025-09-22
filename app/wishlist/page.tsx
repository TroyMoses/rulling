import { WishlistPage } from "@/components/wishlist-page";
import { MainLayout } from "@/components/main-layout";

export default function Wishlist() {
  return (
    <MainLayout>
      <div className="py-8">
        <WishlistPage />
      </div>
    </MainLayout>
  );
}

export const metadata = {
  title: "Wishlist - RULLING Gadget Hub",
  description: "Your saved products and favorites",
};
