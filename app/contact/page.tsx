import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { MainLayout } from "@/components/main-layout";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl font-bold mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Have questions about our products or need assistance? We&apos;re
              here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const metadata = {
  title: "Contact Us - RULLING Gadget Hub",
  description: "Get in touch with our customer support team",
};
