import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: [
        "123 Commerce Street",
        "Business District",
        "New York, NY 10001",
      ],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9AM-6PM EST"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@rulling.com", "We reply within 24 hours"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <div className="space-y-6" data-aos="fade-left">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  {item.details.map((detail, detailIndex) => (
                    <p
                      key={detailIndex}
                      className="text-muted-foreground text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Why Choose RULLING Gadget Hub?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Free shipping on orders over Ugx 20,000</li>
            <li>• 30-day return policy</li>
            <li>• 24/7 customer support</li>
            <li>• Secure payment processing</li>
            <li>• Quality guarantee on all products</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
