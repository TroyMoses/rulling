import { getDatabase } from "@/lib/mongodb";

async function seedSampleData() {
  try {
    console.log("Seeding sample data...");
    const db = await getDatabase();

    // Sample products
    const products = db.collection("products");
    const sampleProducts = [
      {
        name: "iPhone 15 Pro",
        description: "Latest iPhone with advanced camera system",
        price: 999,
        originalPrice: 1099,
        category: "Electronics",
        images: ["/iphone-15-pro-max-back.png"],
        featured: true,
        inStock: true,
        rating: 4.8,
        reviewCount: 156,
        createdAt: new Date(),
      },
      {
        name: "MacBook Air M3",
        description: "Powerful laptop with M3 chip",
        price: 1299,
        originalPrice: 1399,
        category: "Electronics",
        images: ["/macbook-pro-16-inch.jpg"],
        featured: true,
        inStock: true,
        rating: 4.9,
        reviewCount: 89,
        createdAt: new Date(),
      },
      {
        name: "AirPods Pro",
        description: "Wireless earbuds with noise cancellation",
        price: 249,
        originalPrice: 279,
        category: "Electronics",
        images: ["/electronics/airpods.jpg"],
        featured: false,
        inStock: true,
        rating: 4.7,
        reviewCount: 234,
        createdAt: new Date(),
      },
    ];

    await products.insertMany(sampleProducts);
    console.log("✓ Sample products created");

    // Sample banners
    const banners = db.collection("banners");
    const sampleBanners = [
      {
        title: "Big Sale - Up to 50% Off",
        description: "Limited time offer on selected items",
        image: "/banners/soundbar.jpg",
        link: "/products",
        active: true,
        createdAt: new Date(),
      },
    ];

    await banners.insertMany(sampleBanners);
    console.log("✓ Sample banners created");

    console.log("Sample data seeding completed!");
  } catch (error) {
    console.error("Sample data seeding failed:", error);
    throw error;
  }
}

// Run seeding
seedSampleData()
  .then(() => {
    console.log("Sample data setup complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
