import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { promotions } from "@/lib/dummy-data";

export function PromotionsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promotions Management</h1>
          <p className="text-muted-foreground">
            Manage store promotions and discount codes
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Promotion
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Promotions ({promotions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {promotion.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {promotion.code ? (
                      <Badge variant="outline">{promotion.code}</Badge>
                    ) : (
                      <span className="text-muted-foreground">No code</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {promotion.discountType === "percentage"
                        ? `${promotion.discountValue}%`
                        : `$${promotion.discountValue}`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(promotion.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={promotion.active ? "default" : "secondary"}>
                      {promotion.active ? "Active" : "Inactive"}
                    </Badge>
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
