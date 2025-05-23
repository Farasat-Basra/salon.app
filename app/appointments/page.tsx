"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { appointments } from "@/lib/data"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter appointments based on status
  const upcomingAppointments = appointments.filter((appointment) => appointment.status === "confirmed")

  const pastAppointments = appointments.filter(
    (appointment) => appointment.status === "completed" || appointment.status === "cancelled",
  )

  const displayAppointments = activeTab === "upcoming" ? upcomingAppointments : pastAppointments

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Appointments</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          View and manage your upcoming and past appointments.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground mb-4">You don't have any upcoming appointments scheduled.</p>
                <Button asChild>
                  <Link href="/book">Book an Appointment</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} isPast />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No past appointments</h3>
                <p className="text-muted-foreground mb-4">You don't have any past appointment records.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/book">Book New Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function AppointmentCard({ appointment, isPast = false }: { appointment: (typeof appointments)[0]; isPast?: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{appointment.serviceName}</CardTitle>
            <CardDescription>Appointment #{appointment.id}</CardDescription>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === "confirmed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : appointment.status === "cancelled"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
            }`}
          >
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(appointment.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.staffName || "Any available stylist"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>123 Beauty Street, New York</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isPast && appointment.status === "confirmed" ? (
          <>
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </>
        ) : (
          <>
            {appointment.status === "completed" && (
              <Button asChild variant="outline" size="sm">
                <Link href="/feedback">Leave Feedback</Link>
              </Button>
            )}
            <Button asChild variant="default" size="sm">
              <Link href="/book">Book Again</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
