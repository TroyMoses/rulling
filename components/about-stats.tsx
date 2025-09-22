import { Card, CardContent } from "@/components/ui/card";
import { Users, Package, Globe, Award } from "lucide-react";

export function AboutStats() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      description: "Satisfied customers worldwide",
    },
    {
      icon: Package,
      value: "10K+",
      label: "Products",
      description: "Premium products available",
    },
    {
      icon: Globe,
      value: "25+",
      label: "Countries",
      description: "Countries we ship to",
    },
    {
      icon: Award,
      value: "4.8",
      label: "Rating",
      description: "Average customer rating",
    },
  ];

  return (
    <section className="pt-14 pb-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-balance">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            These numbers represent our commitment to excellence and the trust
            our customers place in us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
