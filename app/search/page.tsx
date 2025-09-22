import { SearchResults } from "@/components/search-results";
import { MainLayout } from "@/components/main-layout";

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <MainLayout>
      <div className="py-8">
        <SearchResults searchParams={searchParams} />
      </div>
    </MainLayout>
  );
}

export const metadata = {
  title: "Search Results - RULLING Gadget Hub",
  description: "Find the products you're looking for",
};
