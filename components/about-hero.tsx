import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="pt-14 pb-14 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div data-aos="fade-right">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Your Trusted Partner in Premium Shopping
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Since 2020, RULLING Gadget Hub has been committed to providing
              customers with the highest quality products across multiple
              categories. We believe in excellence, innovation, and customer
              satisfaction above all else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/allproducts" className="w-full sm:w-auto">
                <Button size="lg" className="cursor-pointer">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[120px] lg:h-[320px]" data-aos="fade-left">
            <Image
              src="/modern-office-team.png"
              alt="About RULLING Gadget Hub"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
