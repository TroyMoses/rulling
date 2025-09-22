"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BannerForm } from "@/components/banner-form";
import { banners } from "@/lib/dummy-data";

export function BannersManagement() {
  const [isAddingBanner, setIsAddingBanner] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banners Management</h1>
          <p className="text-muted-foreground">
            Manage promotional banners and hero sections
          </p>
        </div>
        <Dialog open={isAddingBanner} onOpenChange={setIsAddingBanner}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>
                Create a new promotional banner
              </DialogDescription>
            </DialogHeader>
            <BannerForm onSuccess={() => setIsAddingBanner(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Banners ({banners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners
                .sort((a, b) => a.order - b.order)
                .map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="relative h-16 w-24 overflow-hidden rounded-md">
                        <Image
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{banner.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {banner.subtitle}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{banner.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={banner.active ? "default" : "secondary"}>
                        {banner.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                        >
                          {banner.active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Banner</DialogTitle>
                              <DialogDescription>
                                Update banner information
                              </DialogDescription>
                            </DialogHeader>
                            <BannerForm banner={banner} />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
