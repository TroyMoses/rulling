import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/dummy-data";

export function DealsGrid() {
  // Get products on sale (with originalPrice)
  const saleProducts = products.filter((product) => product.originalPrice);

  return (
    <section className="pt-8 pb-8 md:pb-16">
      <div className="container mx-auto px-4">

        {/* Sale Products */}
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-balance">
            All Products on Sale
          </h2>
          <ProductGrid products={saleProducts} />
        </div>
      </div>
    </section>
  );
}
