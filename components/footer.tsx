import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  R
                </span>
              </div>
              <span className="text-xl font-bold">RULLING Gadget Hub</span>
            </div>
            <p className="text-muted-foreground mb-4 text-pretty">
              Your trusted partner for premium products across electronics,
              fashion, home & office, and more.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/electronics"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/fashion"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/home-office"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Home & Office
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/health-beauty"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Health & Beauty
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/sports-outdoors"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  Find us on Kampala Rd, next to Food Hub Parliament Ave
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-muted-foreground text-sm">
                  📞 0754805746 | WhatsApp 0782570143
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  support@rulling.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 RULLING Gadget Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
