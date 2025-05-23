"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CheckCircle, Clock, DollarSign } from "lucide-react"
import { getServiceById, services, staff, timeSlots } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const initialServiceId = searchParams.get("service")

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<string | undefined>(initialServiceId || undefined)
  const [selectedStaff, setSelectedStaff] = useState<string | undefined>(undefined)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const serviceDetails = selectedService ? getServiceById(selectedService) : null

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Check if current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService
      case 2:
        return !!selectedDate && !!selectedTime
      case 3:
        return !!formData.name && !!formData.phone
      default:
        return false
    }
  }

  // Handle next step
  const handleNextStep = () => {
    if (isStepComplete()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 1500)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Book Your Appointment</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Schedule your visit in just a few simple steps.
        </p>
      </div>

      {!isComplete ? (
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2",
                      currentStep === step
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep > step
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      currentStep === step
                        ? "text-primary"
                        : currentStep > step
                          ? "text-primary/80"
                          : "text-muted-foreground",
                    )}
                  >
                    {step === 1 ? "Service" : step === 2 ? "Date & Time" : "Your Info"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-[5%] right-[5%] h-1 bg-muted-foreground/20"></div>
              <div
                className="absolute top-0 left-[5%] h-1 bg-primary transition-all duration-300"
                style={{ width: `${(currentStep - 1) * 45}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service" className="text-base mb-2 block">
                    Select a Service
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="staff" className="text-base mb-2 block">
                    Select a Stylist (Optional)
                  </Label>
                  <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                    <SelectTrigger id="staff">
                      <SelectValue placeholder="Any available stylist" />
                    </SelectTrigger>
                    <SelectContent>
                      {staff.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name} - {person.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {serviceDetails && (
                <Card className="mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle>Service Details</CardTitle>
                    <CardDescription>Information about your selected service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="aspect-square relative rounded-md overflow-hidden">
                        <Image
                          src={serviceDetails.image || "/placeholder.svg"}
                          alt={serviceDetails.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold">{serviceDetails.title}</h3>
                        <p className="text-muted-foreground">{serviceDetails.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">${serviceDetails.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span>{serviceDetails.duration} minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Select Date and Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Select a Date</Label>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                      }
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Select a Time</Label>
                  <div className="border rounded-md p-4 h-full">
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className="text-sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <Card className="mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle>Appointment Summary</CardTitle>
                    <CardDescription>Review your appointment details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Service</p>
                          <p className="font-medium">{serviceDetails?.title}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-medium">${serviceDetails?.price}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                        {selectedStaff && (
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Stylist</p>
                            <p className="font-medium">{staff.find((s) => s.id === selectedStaff)?.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Special Requests (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests or notes for your appointment"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Appointment Summary</CardTitle>
                  <CardDescription>Review your appointment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium">{serviceDetails?.title}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">${serviceDetails?.price}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                      {selectedStaff && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Stylist</p>
                          <p className="font-medium">{staff.find((s) => s.id === selectedStaff)?.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNextStep} disabled={!isStepComplete() || isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : currentStep < 3 ? (
                "Continue"
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/20 p-3">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Your appointment has been successfully booked. We've sent a confirmation to your phone and email.
          </p>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{serviceDetails?.title}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${serviceDetails?.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                  {selectedStaff && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Stylist</p>
                      <p className="font-medium">{staff.find((s) => s.id === selectedStaff)?.name}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="font-medium">
                      SER-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="/appointments">View My Appointments</a>
            </Button>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
