"use client";

import Link from "next/link";
import { categories } from "@/lib/dummy-data";

export function CategoriesSidebar() {
  return (
    <aside className="w-[215px] bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold text-foreground">ALL CATEGORIES</h2>
        </div>

        <div className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center gap-2 p-2 text-left font-normal hover:bg-muted rounded transition-colors w-full"
            >
              <span className="text-sm">{category.icon}</span>
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
