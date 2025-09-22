"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContactForm } from "@/lib/server-actions";
import { toast } from "sonner";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success(result.message);
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
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
    <Card data-aos="fade-right">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Send us a Message</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="contact-form" action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
