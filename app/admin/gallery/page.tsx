"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lightbox } from "@/components/ui/lightbox"
import { Trash, Upload, Plus, Edit, Search, ExternalLink } from "lucide-react"

// Gallery images by category
const galleryImages = {
  hair: [
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1969&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=1972&auto=format&fit=crop",
  ],
  nails: [
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
  ],
  spa: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1970&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
  ],
  salon: [
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=2074&auto=format&fit=crop",
  ],
  transformations: [
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
  ],
}

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)

  const handleImageClick = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleImageSelect = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image))
    } else {
      setSelectedImages([...selectedImages, image])
    }
  }

  const handleDeleteSelected = () => {
    // In a real app, this would call an API to delete the images
    alert(`Deleted ${selectedImages.length} images`)
    setSelectedImages([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setUploadPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    // In a real app, this would upload the file to a server
    alert("Image uploaded successfully!")
    setUploadedFile(null)
    setUploadPreview(null)
  }

  const getAllImages = () => {
    const allImages = [
      ...galleryImages.hair,
      ...galleryImages.nails,
      ...galleryImages.spa,
      ...galleryImages.salon,
      ...galleryImages.transformations,
    ]

    if (searchQuery) {
      return allImages.filter((img) => img.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return allImages
  }

  const getCurrentImages = () => {
    if (activeTab === "all") {
      return getAllImages()
    }

    const categoryImages = galleryImages[activeTab as keyof typeof galleryImages] || []

    if (searchQuery) {
      return categoryImages.filter((img) => img.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return categoryImages
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Gallery Management</CardTitle>
            <div className="flex gap-2">
              {selectedImages.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteSelected}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedImages.length})
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Images</DialogTitle>
                    <DialogDescription>
                      Upload new images to your gallery. Supported formats: JPG, PNG, WebP.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-upload">Select Image</Label>
                      <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
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
                      <Label htmlFor="image-category">Category</Label>
                      <Select>
                        <SelectTrigger id="image-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hair">Hair</SelectItem>
                          <SelectItem value="nails">Nails</SelectItem>
                          <SelectItem value="spa">Spa</SelectItem>
                          <SelectItem value="salon">Salon</SelectItem>
                          <SelectItem value="transformations">Transformations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image-alt">Alt Text</Label>
                      <Input id="image-alt" placeholder="Describe the image for accessibility" />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedFile(null)
                        setUploadPreview(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={!uploadedFile}>
                      Upload
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Before/After
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Before/After Transformation</DialogTitle>
                    <DialogDescription>Create a new before and after transformation showcase.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="transformation-title">Title</Label>
                      <Input id="transformation-title" placeholder="Hair Color Transformation" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transformation-description">Description</Label>
                      <Input id="transformation-description" placeholder="From dark brown to vibrant blonde balayage" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="before-image">Before Image</Label>
                        <Input id="before-image" type="file" accept="image/*" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="after-image">After Image</Label>
                        <Input id="after-image" type="file" accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Create Transformation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search images..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hair">Hair</TabsTrigger>
                <TabsTrigger value="nails">Nails</TabsTrigger>
                <TabsTrigger value="spa">Spa</TabsTrigger>
                <TabsTrigger value="salon">Salon</TabsTrigger>
                <TabsTrigger value="transformations">Transformations</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getCurrentImages().map((image, index) => (
              <div
                key={index}
                className={`relative group rounded-md overflow-hidden border-2 ${
                  selectedImages.includes(image) ? "border-primary" : "border-transparent"
                }`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleImageClick([image], 0)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" className="rounded-full">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-2 left-2 w-5 h-5 rounded border border-primary/50 bg-background/80 flex items-center justify-center cursor-pointer"
                  onClick={() => handleImageSelect(image)}
                >
                  {selectedImages.includes(image) && <div className="w-3 h-3 rounded-sm bg-primary"></div>}
                </div>
              </div>
            ))}
          </div>

          {getCurrentImages().length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No images found matching your search.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  )
}
