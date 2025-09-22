import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/dummy-data";

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Discover our wide range of premium products across multiple
            categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="cursor-pointer"
            >
              <Card
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30"
                        >
                          {category.productCount} items
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-balance">
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90 text-pretty">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
