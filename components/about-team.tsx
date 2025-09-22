import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutTeam() {
  const values = [
    {
      title: "Quality First",
      description:
        "We never compromise on the quality of our products and services.",
      icon: "🏆",
    },
    {
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do.",
      icon: "❤️",
    },
    {
      title: "Innovation",
      description:
        "We continuously innovate to provide the best shopping experience.",
      icon: "💡",
    },
    {
      title: "Sustainability",
      description:
        "We're committed to sustainable and responsible business practices.",
      icon: "🌱",
    },
  ];

  return (
    <section className="pt-8 pb-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-balance">Our Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            These core values guide every decision we make and every interaction
            we have with our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-semibold mb-2 text-balance">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold mb-6 text-balance">
              Our Mission
            </h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              To democratize access to premium products by providing a curated
              selection of high-quality items at competitive prices, backed by
              exceptional customer service and a seamless shopping experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">✓</Badge>
                <span className="text-sm">Curated product selection</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">✓</Badge>
                <span className="text-sm">Competitive pricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">✓</Badge>
                <span className="text-sm">Exceptional customer service</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">✓</Badge>
                <span className="text-sm">Seamless shopping experience</span>
              </div>
            </div>
          </div>
          <div className="relative h-96" data-aos="fade-left">
            <Image
              src="/diverse-team-collaboration.png"
              alt="Our Mission"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
