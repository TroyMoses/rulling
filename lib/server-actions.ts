"use server";

// Product Management Actions - Now using Next.js API routes
export async function createProduct(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to create product",
      };
    }

    return {
      success: true,
      message: "Product created successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/products/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to update product",
      };
    }

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to delete product",
      };
    }

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}

// Banner Management Actions - Now using Next.js API routes
export async function createBanner(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/banners`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to create banner",
      };
    }

    return {
      success: true,
      message: "Banner created successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error creating banner:", error);
    return { success: false, message: "Failed to create banner" };
  }
}

export async function updateBanner(id: string, formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/banners/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to update banner",
      };
    }

    return { success: true, message: "Banner updated successfully" };
  } catch (error) {
    console.error("Error updating banner:", error);
    return { success: false, message: "Failed to update banner" };
  }
}

export async function deleteBanner(id: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/banners/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to delete banner",
      };
    }

    return { success: true, message: "Banner deleted successfully" };
  } catch (error) {
    console.error("Error deleting banner:", error);
    return { success: false, message: "Failed to delete banner" };
  }
}

// Contact Form Action - Now using Next.js API route
export async function submitContactForm(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/contact`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to submit contact form",
      };
    }

    return { success: true, message: "Contact form submitted successfully" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Failed to submit contact form" };
  }
}

// Newsletter Subscription Action - Now using Next.js API route
export async function subscribeNewsletter(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/newsletter`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to subscribe to newsletter",
      };
    }

    return { success: true, message: "Successfully subscribed to newsletter" };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, message: "Failed to subscribe to newsletter" };
  }
}

// Review Submission Action - Now using Next.js API route
export async function submitReview(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/reviews`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to submit review",
      };
    }

    return {
      success: true,
      message: "Review submitted successfully and is pending approval",
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, message: "Failed to submit review" };
  }
}

// Promotion Management Actions - Basic implementation (can be expanded)
// export async function createPromotion(formData: FormData) {
export async function createPromotion() {
  console.log("Promotion creation - basic implementation");
  return {
    success: true,
    message: "Promotion feature can be expanded with dedicated API routes",
  };
}

// Testimonial Management Actions - Now using Next.js API route
export async function createTestimonial(formData: FormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://rulling-gadgetshub.vercel.app"
      }/api/testimonials`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || "Failed to submit testimonial",
      };
    }

    return {
      success: true,
      message: "Testimonial submitted successfully and is pending approval",
    };
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return { success: false, message: "Failed to submit testimonial" };
  }
}
