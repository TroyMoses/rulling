import { getDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth-utils";

async function createAdminUser() {
  try {
    console.log("Creating admin user...");
    const db = await getDatabase();
    const users = db.collection("users");

    // Check if admin user already exists
    const existingAdmin = await users.findOne({ email: "email@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword("password123");
    const adminUser = {
      name: "Admin User",
      email: "email@example.com",
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
    };

    const result = await users.insertOne(adminUser);
    console.log("✓ Admin user created successfully!");
    console.log("Admin credentials:");
    console.log("Email: email@example.com");
    console.log("Password: password123");
    console.log("User ID:", result.insertedId.toString());
  } catch (error) {
    console.error("Failed to create admin user:", error);
    throw error;
  }
}

// Run admin user creation
createAdminUser()
  .then(() => {
    console.log("Admin user setup complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Admin user creation failed:", error);
    process.exit(1);
  });
