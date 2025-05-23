import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceCard } from "@/components/service-card"
import { getFeaturedServices, promotions } from "@/lib/data"
import { ArrowRight, Calendar, CheckCircle, Scissors, Sparkles, Star } from "lucide-react"

export default function Home() {
  const featuredServices = getFeaturedServices()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Your Beauty Journey Starts Here
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience the ultimate in salon services with our expert stylists and premium treatments.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/book">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 relative">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] overflow-hidden rounded-full border-8 border-background shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop"
                  alt="Salon services"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-background p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">500+ Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-primary font-medium">Featured Services</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Most Popular Treatments
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most sought-after services that keep our clients coming back.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/services" className="flex items-center gap-2">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Serenity Salon</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're committed to providing exceptional service and results.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Expert Stylists</h3>
                <p className="text-muted-foreground">
                  Our team of professionals are trained in the latest techniques and trends.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Premium Products</h3>
                <p className="text-muted-foreground">We use only the highest quality products for all our services.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy Booking</h3>
                <p className="text-muted-foreground">
                  Our online booking system makes scheduling appointments simple and convenient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-primary font-medium">Special Offers</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Current Promotions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take advantage of our limited-time offers and special deals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{promo.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Valid until: {new Date(promo.expiryDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/book">Book Now & Save</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Look?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Book your appointment today and experience the Serenity difference.
              </p>
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="/book">Book Your Appointment</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
