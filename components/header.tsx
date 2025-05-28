"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Calendar, Home, MessageSquare, Scissors, User, Info, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isAdmin = pathname.startsWith("/admin")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Zahra Medical</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {!isAdmin ? (
            <>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/services" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Services
              </Link>
              <Link
                href="/staff"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/staff" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Our Team
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/about" ? "text-primary" : "text-foreground/60"
                }`}
              >
                About
              </Link>
              <Link
                href="/book"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/book" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Book
              </Link>
              <Link
                href="/feedback"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/feedback" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Feedback
              </Link>
              <Link
                href="/appointments"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/appointments" ? "text-primary" : "text-foreground/60"
                }`}
              >
                My Appointments
              </Link>
            </>
          ) : (
            <div className="text-sm font-medium text-primary">Admin Dashboard</div>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isAdmin ? (
            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link href="/book">Book Now</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="hidden md:flex">
              <Link href="/">Exit Admin</Link>
            </Button>
          )}
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Zahra Medical</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 p-6">
            {!isAdmin ? (
              <>
                <Link href="/" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/services" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Scissors className="h-5 w-5" />
                  Services
                </Link>
                <Link href="/staff" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Users className="h-5 w-5" />
                  Our Team
                </Link>
                <Link href="/about" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Info className="h-5 w-5" />
                  About
                </Link>
                <Link href="/book" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Calendar className="h-5 w-5" />
                  Book
                </Link>
                <Link href="/feedback" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <MessageSquare className="h-5 w-5" />
                  Feedback
                </Link>
                <Link href="/appointments" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <User className="h-5 w-5" />
                  My Appointments
                </Link>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/book" onClick={toggleMenu}>
                    Book Now
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link href="/admin" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/appointments"
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  <Calendar className="h-5 w-5" />
                  Appointments
                </Link>
                <Link
                  href="/admin/services"
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  <Scissors className="h-5 w-5" />
                  Services
                </Link>
                <Link
                  href="/admin/feedback"
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  <MessageSquare className="h-5 w-5" />
                  Feedback
                </Link>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  <User className="h-5 w-5" />
                  Analytics
                </Link>
                <Button asChild variant="outline" size="lg" className="mt-6">
                  <Link href="/" onClick={toggleMenu}>
                    Exit Admin
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
