import { notFound } from "next/navigation";
import { CategoryHeader } from "@/components/category-header";
import { ProductFilters } from "@/components/product-filters";
import { MainLayout } from "@/components/main-layout";
import { categories, products } from "@/lib/dummy-data";
import { ProductGridCat } from "@/components/product-grid-cat";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    price?: string;
    brand?: string;
    rating?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const paramz = await params;
  const searchParamz = await searchParams;
  const category = categories.find((cat) => cat.slug === paramz.slug);

  if (!category) {
    notFound();
  }

  // Filter products by category
  let categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  // Apply filters based on search params
  if (searchParamz.brand) {
    categoryProducts = categoryProducts.filter(
      (product) => product.brand === searchParamz.brand
    );
  }

  if (searchParamz.rating) {
    const minRating = Number.parseFloat(searchParamz.rating);
    categoryProducts = categoryProducts.filter(
      (product) => product.rating >= minRating
    );
  }

  if (searchParamz.price) {
    const [min, max] = searchParamz.price.split("-").map(Number);
    categoryProducts = categoryProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Apply sorting
  if (searchParamz.sort) {
    switch (searchParamz.sort) {
      case "price-low":
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        categoryProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        categoryProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        categoryProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Default sorting by featured first, then by rating
        categoryProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }
  }

  return (
    <MainLayout>
      <CategoryHeader category={category} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters category={category} />
          </aside>
          <main className="flex-1">
            <ProductGridCat products={categoryProducts} />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const paramz = await params;
  const category = categories.find((cat) => cat.slug === paramz.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - RULLING Gadget Hub`,
    description: category.description,
  };
}
