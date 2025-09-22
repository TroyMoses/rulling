import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/dummy-data";

export function TestimonialsSection() {
  const featuredTestimonials = testimonials.filter(
    (testimonial) => testimonial.featured
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Real feedback from our valued customers who trust us for their
            shopping needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {testimonial.customerImage && (
                    <Image
                      src={testimonial.customerImage || "/placeholder.svg"}
                      alt={testimonial.customerName}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold">
                      {testimonial.customerName}
                    </h4>
                    {testimonial.location && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-pretty">
                  {testimonial.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
