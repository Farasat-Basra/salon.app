import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StaffCard } from "@/components/staff-card"
import { staff } from "@/lib/data"
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Zahra Medical Salon</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Your destination for beauty, relaxation, and self-care.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop"
            alt="Salon interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, Zahra Medical Salon began with a simple mission: to create a sanctuary where clients could
            escape the hustle of everyday life and indulge in premium beauty and wellness services.
          </p>
          <p className="text-muted-foreground">
            What started as a small studio with just three stylists has grown into a full-service salon and spa,
            offering a comprehensive range of hair, nail, and body treatments. Throughout our growth, we've remained
            committed to our founding principles of exceptional service, personalized care, and creating a warm,
            welcoming environment for all our clients.
          </p>
          <p className="text-muted-foreground">
            Today, Zahra Medical Salon is proud to be a cornerstone of the community, helping our clients look and feel their
            best for over a decade.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            These core principles guide everything we do at Zahra Medical Salon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every service we provide, using premium products and staying current with
                industry trends and techniques.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Personalization</h3>
              <p className="text-muted-foreground">
                We believe that beauty is not one-size-fits-all. Each client receives a customized experience tailored
                to their unique needs and preferences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-muted-foreground">
                We're committed to creating a positive impact in our community through charitable initiatives and
                sustainable business practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Team Members */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            Meet the talented professionals who lead our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((person) => (
            <StaffCard key={person.id} staff={person} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/staff">View All Team Members</Link>
          </Button>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Visit Us</h2>
          <p className="text-muted-foreground">
            Our salon is conveniently located in the heart of downtown, with ample parking and easy access to public
            transportation.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Zahra Medical Salon</p>
                <p className="text-muted-foreground">123 Beauty Street</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <p>(555) 123-4567</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p>info@Zahra Medicalsalon.com</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-bold mb-2">Hours of Operation</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-medium">Monday - Friday</p>
                <p className="text-muted-foreground">9:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Saturday</p>
                <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Sunday</p>
                <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
  <a
    href="https://www.google.com/maps/place/123+Beauty+Street,+New+York,+NY+10001"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open location in Google Maps"
    className="block w-full h-full"
  >
    <iframe
      title="Zahra Medical Salon Location"
      src="https://www.google.com/maps?q=123+Beauty+Street,+New+York,+NY+10001&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0, width: '100%', height: '100%', minHeight: '300px', borderRadius: '12px' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    <span className="absolute inset-0"></span>
  </a>
</div>
      </div>

      {/* CTA */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Zahra Medical?</h2>
        <p className="max-w-[600px] mx-auto text-muted-foreground mb-6">
          Book your appointment today and discover why our clients keep coming back.
        </p>
        <Button asChild size="lg">
          <Link href="/book">Book Your Appointment</Link>
        </Button>
      </div>
    </div>
  )
}
