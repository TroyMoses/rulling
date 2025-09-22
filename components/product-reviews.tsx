"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { submitReview } from "@/lib/server-actions";
import { reviews } from "@/lib/dummy-data";
import { toast } from "sonner";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );

  async function handleSubmitReview(formData: FormData) {
    setIsLoading(true);
    try {
      formData.append("productId", productId);
      formData.append("rating", rating.toString());

      const result = await submitReview(formData);
      if (result.success) {
        toast.success(result.message);
        setIsWritingReview(false);
        setRating(0);
        // Reset form
        const form = document.getElementById("review-form") as HTMLFormElement;
        form?.reset();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button
          onClick={() => setIsWritingReview(!isWritingReview)}
          className="cursor-pointer"
        >
          {isWritingReview ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {/* Write Review Form */}
      {isWritingReview && (
        <Card data-aos="fade-up">
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              id="review-form"
              action={handleSubmitReview}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Name</Label>
                  <Input id="customerName" name="customerName" required />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Rating</Label>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Review Title</Label>
                <Input id="title" name="title" required />
              </div>

              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea id="comment" name="comment" rows={4} required />
              </div>

              <Button
                type="submit"
                disabled={isLoading || rating === 0}
                className="cursor-pointer"
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {productReviews.length > 0 ? (
          productReviews.map((review, index) => (
            <Card
              key={review.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {review.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <h4 className="font-semibold mb-2 text-balance">
                  {review.title}
                </h4>
                <p className="text-muted-foreground mb-4 text-pretty">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
