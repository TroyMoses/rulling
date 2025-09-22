import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail, Download, Search, Send } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock newsletter subscribers data
const subscribers = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Smith",
    subscribed: true,
    subscribedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "sarah@example.com",
    name: "Sarah Johnson",
    subscribed: true,
    subscribedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "3",
    email: "mike@example.com",
    name: "Mike Davis",
    subscribed: false,
    subscribedAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "4",
    email: "emily@example.com",
    name: "Emily Chen",
    subscribed: true,
    subscribedAt: "2024-01-12T16:45:00Z",
  },
];

const campaigns = [
  {
    id: "1",
    subject: "New Year Sale - Up to 50% Off!",
    sent: 1250,
    opened: 875,
    clicked: 234,
    sentAt: "2024-01-01T08:00:00Z",
    status: "sent",
  },
  {
    id: "2",
    subject: "Weekly Newsletter - Latest Products",
    sent: 1180,
    opened: 720,
    clicked: 156,
    sentAt: "2024-01-08T10:00:00Z",
    status: "sent",
  },
  {
    id: "3",
    subject: "Valentine's Day Special Offers",
    sent: 0,
    opened: 0,
    clicked: 0,
    sentAt: null,
    status: "draft",
  },
];

export function NewsletterManagement() {
  const activeSubscribers = subscribers.filter((sub) => sub.subscribed).length;
  const totalSubscribers = subscribers.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Management</h1>
          <p className="text-muted-foreground">
            Manage subscribers and email campaigns
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">{activeSubscribers}</div>
                <p className="text-sm text-muted-foreground">
                  Active Subscribers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalSubscribers}</div>
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-sm text-muted-foreground">Avg. Click Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Campaigns</CardTitle>
            <Button variant="outline" className="cursor-pointer bg-transparent">
              <Send className="h-4 w-4 mr-2" />
              Send Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Clicked</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <p className="font-medium">{campaign.subject}</p>
                  </TableCell>
                  <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <span>{campaign.opened.toLocaleString()}</span>
                      {campaign.sent > 0 && (
                        <span className="text-sm text-muted-foreground ml-1">
                          (
                          {((campaign.opened / campaign.sent) * 100).toFixed(1)}
                          %)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span>{campaign.clicked.toLocaleString()}</span>
                      {campaign.sent > 0 && (
                        <span className="text-sm text-muted-foreground ml-1">
                          (
                          {((campaign.clicked / campaign.sent) * 100).toFixed(
                            1
                          )}
                          %)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {campaign.sentAt
                      ? new Date(campaign.sentAt).toLocaleDateString()
                      : "Not sent"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "sent" ? "default" : "secondary"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscribers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subscribers ({subscribers.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search subscribers..."
                  className="pl-10 w-64"
                />
              </div>
              <Button
                variant="outline"
                className="cursor-pointer bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <p className="font-medium">{subscriber.email}</p>
                  </TableCell>
                  <TableCell>{subscriber.name || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={subscriber.subscribed ? "default" : "secondary"}
                    >
                      {subscriber.subscribed ? "Active" : "Unsubscribed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
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
