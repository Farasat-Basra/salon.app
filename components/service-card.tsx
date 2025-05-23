import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign } from "lucide-react"

interface ServiceCardProps {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image: string
  featured?: boolean
}

export function ServiceCard({ id, title, description, price, duration, image, featured = false }: ServiceCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-primary/50" : ""}`}>
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${price}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration} min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/book?service=${id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
