import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/ui/chart"
import { Calendar, DollarSign, MessageSquare, Scissors, TrendingUp } from "lucide-react"
import { analyticsData, appointments, reviews, services, staff } from "@/lib/data"

export default function AdminDashboard() {
  // Count upcoming appointments (confirmed status)
  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed").length

  // Calculate total revenue from completed appointments
  const totalRevenue = appointments
    .filter((apt) => apt.status === "completed")
    .reduce((sum, apt) => {
      const service = services.find((s) => s.id === apt.serviceId)
      return sum + (service?.price || 0)
    }, 0)

  // Get average rating from reviews
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                <h3 className="text-2xl font-bold mt-1">{upcomingAppointments}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="ghost" size="sm" className="px-0">
                <Link href="/admin/appointments">View all appointments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${totalRevenue}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">12%</span> from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                <h3 className="text-2xl font-bold mt-1">{services.length}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Scissors className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="ghost" size="sm" className="px-0">
                <Link href="/admin/services">Manage services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Rating</p>
                <h3 className="text-2xl font-bold mt-1">{averageRating.toFixed(1)}/5</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="ghost" size="sm" className="px-0">
                <Link href="/admin/feedback">View feedback</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointments Overview</CardTitle>
            <CardDescription>Appointments per day for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={analyticsData.appointmentsPerDay}
              index="day"
              categories={["count"]}
              colors={["#f9d1e0"]}
              formatType="appts"
              className="aspect-[4/3]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Revenue breakdown by service category</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={analyticsData.revenueByCategory}
              index="category"
              categories={["amount"]}
              colors={["#f9d1e0"]}
              formatType="dollars"
              className="aspect-[4/3]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest appointments and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appointments">
            <TabsList className="mb-4">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments">
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{appointment.customerName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.serviceName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </span>
                      </div>
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
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="flex items-start justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <div className="flex mt-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-primary" : "text-muted"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Staff Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Staff Overview</CardTitle>
              <CardDescription>Current staff members and specialties</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href="/admin/staff">Manage Staff</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {staff.map((person) => (
              <div key={person.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                    <img src={person.image || "/placeholder.svg"} alt={person.name} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {person.specialties.map((specialty, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
