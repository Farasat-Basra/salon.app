"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Instagram } from "lucide-react"

// Mock Instagram data
const mockInstagramPosts = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    caption: "Fresh highlights for summer! ☀️ #summerhair #highlights #serenitysalon",
    likes: 124,
    comments: 18,
    timestamp: "2 days ago",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
    caption: "Nail art of the day! 💅 #nailart #manicure #serenitysalon",
    likes: 98,
    comments: 12,
    timestamp: "3 days ago",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1970&auto=format&fit=crop",
    caption: "Relaxing facial treatments now available! Book yours today. #spa #facial #selfcare",
    likes: 156,
    comments: 24,
    timestamp: "5 days ago",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop",
    caption: "New week, new look! 💇‍♀️ #haircut #transformation #serenitysalon",
    likes: 201,
    comments: 32,
    timestamp: "1 week ago",
  },
]

interface InstagramFeedProps {
  limit?: number
}

export function InstagramFeed({ limit = 4 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<typeof mockInstagramPosts>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPosts(mockInstagramPosts.slice(0, limit))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [limit])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Instagram</h3>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          @serenitysalon
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(limit)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square relative">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" /> {post.comments}
                    </span>
                  </div>
                  <span>{post.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button asChild variant="outline" size="sm">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2 h-4 w-4" />
            Follow Us on Instagram
          </a>
        </Button>
      </div>
    </div>
  )
}
