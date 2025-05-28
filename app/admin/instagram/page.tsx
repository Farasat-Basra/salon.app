"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, MessageCircle, Calendar, Trash, Edit, Plus, RefreshCw } from "lucide-react"

// Mock Instagram data
const mockInstagramPosts = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    caption: "Fresh highlights for summer! ☀️ #summerhair #highlights #Zahra Medicalsalon",
    likes: 124,
    comments: 18,
    timestamp: "2 days ago",
    scheduled: false,
    published: true,
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
    caption: "Nail art of the day! 💅 #nailart #manicure #Zahra Medicalsalon",
    likes: 98,
    comments: 12,
    timestamp: "3 days ago",
    scheduled: false,
    published: true,
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1970&auto=format&fit=crop",
    caption: "Relaxing facial treatments now available! Book yours today. #spa #facial #selfcare",
    likes: 156,
    comments: 24,
    timestamp: "5 days ago",
    scheduled: false,
    published: true,
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop",
    caption: "New week, new look! 💇‍♀️ #haircut #transformation #Zahra Medicalsalon",
    likes: 201,
    comments: 32,
    timestamp: "1 week ago",
    scheduled: false,
    published: true,
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop",
    caption: "Summer special: 20% off all haircuts this week only! Book now. #summersale #haircut #discount",
    likes: 0,
    comments: 0,
    timestamp: "Tomorrow at 10:00 AM",
    scheduled: true,
    published: false,
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=2070&auto=format&fit=crop",
    caption:
      "New nail polish collection just arrived! Which color would you choose? #nailpolish #manicure #newcollection",
    likes: 0,
    comments: 0,
    timestamp: "Next Monday at 9:00 AM",
    scheduled: true,
    published: false,
  },
]

export default function AdminInstagramPage() {
  const [activeTab, setActiveTab] = useState("published")
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [editPost, setEditPost] = useState<(typeof mockInstagramPosts)[0] | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreatePost = () => {
    // In a real app, this would create a new post
    alert("Post created successfully!")
    setUploadPreview(null)
  }

  const handleEditPost = (post: (typeof mockInstagramPosts)[0]) => {
    setEditPost(post)
  }

  const handleSaveEdit = () => {
    // In a real app, this would save the edited post
    alert("Post updated successfully!")
    setEditPost(null)
  }

  const handleDeletePost = (postId: string) => {
    // In a real app, this would delete the post
    alert(`Post ${postId} deleted successfully!`)
  }

  const publishedPosts = mockInstagramPosts.filter((post) => post.published)
  const scheduledPosts = mockInstagramPosts.filter((post) => post.scheduled)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Instagram Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage your Instagram posts and schedule new content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Feed
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Instagram Post</DialogTitle>
                    <DialogDescription>
                      Create a new post for your Instagram feed. You can publish immediately or schedule for later.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-image">Upload Image</Label>
                      <Input id="post-image" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {uploadPreview && (
                      <div className="mt-4">
                        <Label>Preview</Label>
                        <div className="mt-2 relative aspect-square w-full max-w-md mx-auto rounded-md overflow-hidden border">
                          <Image
                            src={uploadPreview || "/placeholder.svg"}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="post-caption">Caption</Label>
                      <Textarea id="post-caption" placeholder="Write your caption here..." rows={4} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-hashtags">Hashtags</Label>
                      <Input id="post-hashtags" placeholder="#Zahra Medicalsalon #hairsalon #beauty" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="schedule-post" />
                      <Label htmlFor="schedule-post">Schedule for later</Label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="schedule-date">Date</Label>
                        <Input id="schedule-date" type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schedule-time">Time</Label>
                        <Input id="schedule-time" type="time" />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUploadPreview(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePost}>Create Post</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="published" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            <TabsContent value="published">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedPosts.map((post) => (
                  <InstagramPostCard
                    key={post.id}
                    post={post}
                    onEdit={() => handleEditPost(post)}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))}
              </div>

              {publishedPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No published posts found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scheduledPosts.map((post) => (
                  <InstagramPostCard
                    key={post.id}
                    post={post}
                    onEdit={() => handleEditPost(post)}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))}
              </div>

              {scheduledPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No scheduled posts found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Post Dialog */}
      {editPost && (
        <Dialog open={!!editPost} onOpenChange={(open) => !open && setEditPost(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Instagram Post</DialogTitle>
              <DialogDescription>Make changes to your Instagram post.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="relative aspect-square w-full max-w-md mx-auto rounded-md overflow-hidden border">
                <Image src={editPost.imageUrl || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-caption">Caption</Label>
                <Textarea id="edit-caption" defaultValue={editPost.caption} rows={4} />
              </div>

              {editPost.scheduled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input id="edit-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input id="edit-time" type="time" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditPost(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

interface InstagramPostCardProps {
  post: (typeof mockInstagramPosts)[0]
  onEdit: () => void
  onDelete: () => void
}

function InstagramPostCard({ post, onEdit, onDelete }: InstagramPostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={post.imageUrl || "/placeholder.svg"}
          alt={post.caption}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.caption}</p>

        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {post.published && (
              <>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {post.comments}
                </span>
              </>
            )}
            {post.scheduled && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.timestamp}
              </span>
            )}
          </div>
          {post.published && <span>{post.timestamp}</span>}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
