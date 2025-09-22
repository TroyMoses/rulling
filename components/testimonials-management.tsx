import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { testimonials } from "@/lib/dummy-data";

export function TestimonialsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-muted-foreground">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{testimonial.customerName}</p>
                      {testimonial.location && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
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
                      <span className="ml-2 text-sm">{testimonial.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm line-clamp-3">
                      {testimonial.comment}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <Badge
                        variant={testimonial.verified ? "default" : "secondary"}
                      >
                        {testimonial.verified ? "Verified" : "Unverified"}
                      </Badge>
                      {testimonial.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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
