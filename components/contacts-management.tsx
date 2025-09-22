import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Reply, Trash2, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock contact messages data
const contactMessages = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Product Inquiry",
    message:
      "I'm interested in the iPhone 15 Pro Max. Is it available in blue color?",
    status: "new" as const,
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Shipping Question",
    message: "When will my order #12345 be shipped? I need it urgently.",
    status: "read" as const,
    createdAt: "2024-01-19T10:15:00Z",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@example.com",
    subject: "Return Request",
    message:
      "I would like to return the headphones I purchased last week. They don't fit properly.",
    status: "replied" as const,
    createdAt: "2024-01-18T16:45:00Z",
  },
];

export function ContactsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and support requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">New Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-sm text-muted-foreground">Read</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-sm text-muted-foreground">Replied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">3</div>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages ({contactMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {message.email}
                      </p>
                      {message.phone && (
                        <p className="text-sm text-muted-foreground">
                          {message.phone}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{message.subject}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm line-clamp-2">{message.message}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.status === "new"
                          ? "destructive"
                          : message.status === "read"
                          ? "secondary"
                          : message.status === "replied"
                          ? "default"
                          : "outline"
                      }
                    >
                      {message.status.charAt(0).toUpperCase() +
                        message.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <CheckCircle className="h-4 w-4" />
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
