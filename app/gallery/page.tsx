"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbox } from "@/components/ui/lightbox"
import { InstagramFeed } from "@/components/instagram-feed"
import { BeforeAfterSlider } from "@/components/before-after-slider"

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
}

// Before and after transformations
const transformations = [
  {
    id: "1",
    title: "Hair Color Transformation",
    description: "From dark brown to vibrant blonde balayage",
    beforeImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Haircut Makeover",
    description: "Long to short bob transformation",
    beforeImage: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=1974&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Nail Art Transformation",
    description: "Simple manicure to elaborate nail art",
    beforeImage: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1974&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleImageClick = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const getAllImages = () => {
    return [...galleryImages.hair, ...galleryImages.nails, ...galleryImages.spa, ...galleryImages.salon].slice(0, 12)
  }

  const getCurrentImages = () => {
    switch (activeTab) {
      case "hair":
        return galleryImages.hair
      case "nails":
        return galleryImages.nails
      case "spa":
        return galleryImages.spa
      case "salon":
        return galleryImages.salon
      default:
        return getAllImages()
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Gallery</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Browse our portfolio of work and get inspired for your next visit.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hair">Hair</TabsTrigger>
            <TabsTrigger value="nails">Nails</TabsTrigger>
            <TabsTrigger value="spa">Spa</TabsTrigger>
            <TabsTrigger value="salon">Salon</TabsTrigger>
            <TabsTrigger value="transformations">Transformations</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllImages().map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                alt={`Gallery image ${index + 1}`}
                onClick={() => handleImageClick(getAllImages(), index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hair">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.hair.map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                alt={`Hair styling image ${index + 1}`}
                onClick={() => handleImageClick(galleryImages.hair, index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nails">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.nails.map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                alt={`Nail art image ${index + 1}`}
                onClick={() => handleImageClick(galleryImages.nails, index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spa">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.spa.map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                alt={`Spa treatment image ${index + 1}`}
                onClick={() => handleImageClick(galleryImages.spa, index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="salon">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.salon.map((image, index) => (
              <GalleryImage
                key={index}
                src={image}
                alt={`Salon interior image ${index + 1}`}
                onClick={() => handleImageClick(galleryImages.salon, index)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transformations">
          <div className="space-y-12">
            {transformations.map((transformation) => (
              <div key={transformation.id} className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">{transformation.title}</h3>
                  <p className="text-muted-foreground">{transformation.description}</p>
                </div>
                <BeforeAfterSlider
                  beforeImage={transformation.beforeImage}
                  afterImage={transformation.afterImage}
                  beforeAlt={`Before ${transformation.title}`}
                  afterAlt={`After ${transformation.title}`}
                  className="max-w-2xl mx-auto"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Instagram Feed Section */}
      <div className="mt-16 pt-8 border-t">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Follow Us on Instagram</h2>
          <p className="text-muted-foreground">Stay updated with our latest styles, promotions, and salon news.</p>
        </div>
        <InstagramFeed />
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-6">Ready to experience our services for yourself?</p>
        <Button asChild size="lg">
          <Link href="/book">Book an Appointment</Link>
        </Button>
      </div>

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

function GalleryImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <div className="overflow-hidden rounded-lg cursor-pointer" onClick={onClick}>
      <div className="aspect-square relative group">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="scale-0 group-hover:scale-100 transition-transform duration-300 bg-background/80 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
