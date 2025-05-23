import Link from "next/link"
import { Scissors, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Serenity</span>
            </div>
            <p className="text-sm text-muted-foreground">Your destination for beauty and relaxation.</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-muted-foreground hover:text-primary">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Contact</h3>
            <address className="not-italic space-y-2">
              <p className="text-sm text-muted-foreground">123 Beauty Street</p>
              <p className="text-sm text-muted-foreground">New York, NY 10001</p>
              <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              <p className="text-sm text-muted-foreground">info@serenitysalon.com</p>
            </address>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Serenity Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
