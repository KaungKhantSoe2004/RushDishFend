"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { FiArrowLeft, FiStar } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ReviewPage() {
  const { id } = useParams()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock order data
  const order = {
    id: id as string,
    restaurant: "Pizza Hut",
    date: "Yesterday, 7:45 PM",
    items: ["1 x Large Pepperoni Pizza", "1 x Garlic Bread", "1 x Coke"],
    image: "/placeholder.svg?height=100&width=100",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/orders")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/orders">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Leave a Review</h1>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Rate your experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-md">
                <img
                  src={order.image || "/placeholder.svg"}
                  alt={order.restaurant}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{order.restaurant}</h3>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>How was your order?</Label>
                <div className="flex justify-center">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <FiStar
                          className={`h-10 w-10 ${
                            star <= (hoveredRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Share your experience (optional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us what you liked or didn't like about your order..."
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/orders">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} disabled={rating === 0 || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
