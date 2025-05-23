"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { reviews } from "@/lib/data"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setRating(0)
      setName("")
      setComment("")
    }, 1500)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Customer Feedback</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          We value your opinion. Share your experience with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">What Our Clients Say</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      {review.avatar ? (
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                          {review.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{review.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>Share your experience with our services</CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className="focus:outline-none"
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setHoveredRating(i + 1)}
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              i < (hoveredRating || rating)
                                ? "fill-primary text-primary"
                                : "text-muted hover:text-primary/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with us"
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={rating === 0 || isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/20 p-3">
                      <Star className="h-8 w-8 fill-primary text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your review has been submitted successfully. We appreciate your feedback!
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                    Write Another Review
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
