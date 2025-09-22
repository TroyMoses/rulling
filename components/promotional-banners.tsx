import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PromotionalBanners() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Electronics Promotion */}
          <Card className="overflow-hidden" data-aos="fade-right">
            <CardContent className="p-0">
              <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
                <Image
                  src="/electronics-banner.png"
                  alt="Electronics Sale"
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-balance">
                    Latest Electronics
                  </h3>
                  <p className="mb-4 text-pretty opacity-90">
                    Discover cutting-edge technology with up to 30% off
                  </p>
                  <Button variant="secondary" className="w-fit cursor-pointer">
                    Shop Electronics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fashion Promotion */}
          <Card className="overflow-hidden" data-aos="fade-left">
            <CardContent className="p-0">
              <div className="relative h-64 bg-gradient-to-r from-pink-500 to-rose-500">
                <Image
                  src="/fashion-banner.png"
                  alt="Fashion Sale"
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-balance">
                    Fashion Forward
                  </h3>
                  <p className="mb-4 text-pretty opacity-90">
                    Trending styles for every season - Free shipping on orders
                    over Ugx 20,000
                  </p>
                  <Button variant="secondary" className="w-fit cursor-pointer">
                    Shop Fashion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
