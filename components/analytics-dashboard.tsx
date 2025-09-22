import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
} from "lucide-react";

export function AnalyticsDashboard() {
  // Mock analytics data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      period: "vs last month",
    },
    {
      title: "Total Orders",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      period: "vs last month",
    },
    {
      title: "Website Visitors",
      value: "45,231",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      period: "vs last month",
    },
    {
      title: "New Customers",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      period: "vs last month",
    },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 156, revenue: "$186,744" },
    { name: 'MacBook Pro 16"', sales: 89, revenue: "$222,311" },
    { name: "Sony WH-1000XM5", sales: 234, revenue: "$93,366" },
    { name: "Ergonomic Office Chair", sales: 67, revenue: "$20,033" },
    { name: "Premium Cotton T-Shirt", sales: 445, revenue: "$12,905" },
  ];

  const topCategories = [
    { name: "Electronics", percentage: 45.2, revenue: "$56,234" },
    { name: "Fashion", percentage: 23.8, revenue: "$29,567" },
    { name: "Home & Office", percentage: 15.6, revenue: "$19,445" },
    { name: "Health & Beauty", percentage: 10.1, revenue: "$12,567" },
    { name: "Sports & Outdoors", percentage: 5.3, revenue: "$6,598" },
  ];

  const recentActivity = [
    {
      event: "New order placed",
      details: "Order #12345 - $299.99",
      time: "2 minutes ago",
    },
    {
      event: "Product review submitted",
      details: "iPhone 15 Pro Max - 5 stars",
      time: "15 minutes ago",
    },
    {
      event: "New customer registered",
      details: "john.doe@example.com",
      time: "32 minutes ago",
    },
    {
      event: "Newsletter subscriber",
      details: "sarah.smith@example.com",
      time: "1 hour ago",
    },
    {
      event: "Contact form submitted",
      details: "Product inquiry",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your store&apos;s performance and key metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {metric.change}
                  </span>
                  <span>{metric.period}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card data-aos="fade-up">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card data-aos="fade-up" data-aos-delay={100}>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.revenue}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{category.percentage}% of total sales</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card data-aos="fade-up">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
