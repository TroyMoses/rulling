import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DealsHero() {
  return (
    <section className="py-16 bg-gradient-to-r from-destructive/10 to-primary/10">
      <div className="container mx-auto px-4 text-center">
        <div data-aos="fade-up">
          <Badge variant="destructive" className="mb-4 text-sm">
            Limited Time Offers
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Amazing Deals & Promotions
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Don&apos;t miss out on our exclusive deals and promotions. Save big on
            premium products across all categories.
          </p>
          <Button size="lg" className="cursor-pointer">
            Shop All Deals
          </Button>
        </div>
      </div>
    </section>
  );
}
