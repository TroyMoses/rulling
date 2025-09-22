"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Upload } from "lucide-react";
import { toast } from "sonner";

export function SettingsManagement() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully!");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Store Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="cursor-pointer">
            General
          </TabsTrigger>
          <TabsTrigger value="shipping" className="cursor-pointer">
            Shipping
          </TabsTrigger>
          <TabsTrigger value="payments" className="cursor-pointer">
            Payments
          </TabsTrigger>
          <TabsTrigger value="notifications" className="cursor-pointer">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="seo" className="cursor-pointer">
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="RULLING Gadget Hub" />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    defaultValue="support@rulling.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  rows={3}
                  defaultValue="Your trusted partner for premium products across electronics, fashion, home & office, and more."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="storeAddress">Address</Label>
                  <Input
                    id="storeAddress"
                    defaultValue="123 Commerce Street, Business District, NY 10001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Logo & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Store Logo</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                      E
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    defaultValue="#ea580c"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    defaultValue="#f97316"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Free Shipping</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable free shipping for orders above threshold
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div>
                <Label htmlFor="freeShippingThreshold">
                  Free Shipping Threshold (UGX)
                </Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  defaultValue="50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="standardShipping">
                    Standard Shipping Rate ($)
                  </Label>
                  <Input
                    id="standardShipping"
                    type="number"
                    defaultValue="5.99"
                  />
                </div>
                <div>
                  <Label htmlFor="expressShipping">
                    Express Shipping Rate ($)
                  </Label>
                  <Input
                    id="expressShipping"
                    type="number"
                    defaultValue="9.99"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Credit/Debit Cards</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept Visa, Mastercard, American Express
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>PayPal</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept PayPal payments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Apple Pay</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept Apple Pay payments
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Google Pay</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept Google Pay payments
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Order Confirmations</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email when orders are placed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Shipping Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email when orders are shipped
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when products are low in stock
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Review Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new reviews are submitted
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  defaultValue="RULLING Gadget Hub - Premium E-commerce Experience"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  rows={3}
                  defaultValue="Discover premium products across electronics, fashion, home & office, health & beauty, and more."
                />
              </div>
              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  defaultValue="ecommerce, premium products, electronics, fashion, shopping"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable Google Analytics tracking
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
