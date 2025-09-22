import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";

interface CategoryHeaderProps {
  category: Category;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
      <Image
        src={category.image || "/placeholder.svg"}
        alt={category.name}
        fill
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-foreground" data-aos="fade-up">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <Badge variant="secondary" className="text-sm">
              {category.productCount} products
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
}
