import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { ProductReviews } from "@/components/product-reviews";
import { RelatedProducts } from "@/components/related-products";
import { MainLayout } from "@/components/main-layout";
import { products } from "@/lib/dummy-data";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const paramz = await params;
  const product = products.find((p) => p.id === paramz.id);

  if (!product) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div>
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </MainLayout>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const paramz = await params;
  const product = products.find((p) => p.id === paramz.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - RULLING Gadget Hub`,
    description: product.description,
  };
}
