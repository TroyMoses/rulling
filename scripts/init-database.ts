// import 'dotenv/config';

import { getDatabase } from "@/lib/mongodb";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    const db = await getDatabase();

    // Create users collection with indexes
    const users = db.collection("users");
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ isAdmin: 1 });
    console.log("✓ Users collection initialized");

    // Create products collection with indexes
    const products = db.collection("products");
    await products.createIndex({ name: "text", description: "text" });
    await products.createIndex({ category: 1 });
    await products.createIndex({ featured: 1 });
    await products.createIndex({ createdAt: -1 });
    console.log("✓ Products collection initialized");

    // Create orders collection with indexes
    const orders = db.collection("orders");
    await orders.createIndex({ userId: 1 });
    await orders.createIndex({ status: 1 });
    await orders.createIndex({ createdAt: -1 });
    console.log("✓ Orders collection initialized");

    // Create reviews collection with indexes
    const reviews = db.collection("reviews");
    await reviews.createIndex({ productId: 1 });
    await reviews.createIndex({ userId: 1 });
    await reviews.createIndex({ status: 1 });
    console.log("✓ Reviews collection initialized");

    // Create other collections
    const collections = ["banners", "testimonials", "newsletter", "contacts"];
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      await collection.createIndex({ createdAt: -1 });
      console.log(`✓ ${collectionName} collection initialized`);
    }

    console.log("Database initialization completed successfully!");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

// Run initialization
initializeDatabase()
  .then(() => {
    console.log("Database setup complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exit(1);
  });
