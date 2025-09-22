import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { products, reviews, testimonials } from "@/lib/dummy-data";

export function AdminDashboard() {
  // Calculate stats from dummy data
  const totalProducts = products.length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalTestimonials = testimonials.length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      change: "+12%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Customers",
      value: "2,350",
      change: "+180",
      trend: "up",
      icon: Users,
    },
    {
      title: "Orders Today",
      value: "89",
      change: "-5%",
      trend: "down",
      icon: ShoppingCart,
    },
  ];

  const recentActivity = [
    {
      action: "New product added",
      item: "iPhone 15 Pro Max",
      time: "2 hours ago",
    },
    {
      action: "Review submitted",
      item: 'MacBook Pro 16"',
      time: "4 hours ago",
    },
    { action: "Banner updated", item: "New Year Sale", time: "6 hours ago" },
    {
      action: "Promotion created",
      item: "Free Shipping Weekend",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <Card data-aos="fade-up">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Featured Products</span>
              <Badge variant="secondary">{featuredProducts}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Reviews</span>
              <Badge variant="secondary">{totalReviews}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Rating</span>
              <Badge variant="secondary">{averageRating.toFixed(1)} ⭐</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Testimonials</span>
              <Badge variant="secondary">{totalTestimonials}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card data-aos="fade-up" data-aos-delay={100}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card data-aos="fade-up">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${product.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.rating} ⭐
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
