"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { subscribeNewsletter } from "@/lib/server-actions";
import { toast } from "sonner";

export function NewsletterSection() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await subscribeNewsletter(formData);
      if (result.success) {
        toast.success(result.message);
        // Reset form
        const form = document.getElementById(
          "newsletter-form"
        ) as HTMLFormElement;
        form?.reset();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto" data-aos="fade-up">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Stay Updated
              </h2>
              <p className="text-muted-foreground text-pretty">
                Subscribe to our newsletter and be the first to know about new
                products, exclusive deals, and special offers.
              </p>
            </div>

            <form
              id="newsletter-form"
              action={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
