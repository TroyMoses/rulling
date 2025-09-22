"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createBanner, updateBanner } from "@/lib/server-actions";
import { toast } from "sonner";
import type { Banner } from "@/lib/types";

interface BannerFormProps {
  banner?: Banner;
  onSuccess?: () => void;
}

export function BannerForm({ banner, onSuccess }: BannerFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = banner
        ? await updateBanner(banner.id, formData)
        : await createBanner(formData);

      if (result.success) {
        toast.success(result.message);
        onSuccess?.();
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
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Banner Title</Label>
        <Input id="title" name="title" defaultValue={banner?.title} required />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          id="subtitle"
          name="subtitle"
          rows={2}
          defaultValue={banner?.subtitle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            defaultValue={banner?.image}
            required
          />
        </div>
        <div>
          <Label htmlFor="link">Link URL</Label>
          <Input
            id="link"
            name="link"
            type="url"
            defaultValue={banner?.link}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            name="buttonText"
            defaultValue={banner?.buttonText}
            required
          />
        </div>
        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={banner?.order}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={banner?.active}
          className="cursor-pointer"
        />
        <Label htmlFor="active" className="cursor-pointer">
          Active Banner
        </Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading ? "Saving..." : banner ? "Update Banner" : "Create Banner"}
        </Button>
      </div>
    </form>
  );
}
