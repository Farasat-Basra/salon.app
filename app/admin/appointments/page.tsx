"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { appointments, services, staff } from "@/lib/data"
import { CalendarIcon, Clock, Edit, MoreHorizontal, Search, Trash, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)

  // Filter appointments based on search, status, and date
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.customerPhone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    const matchesDate = !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Appointment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, service, or phone..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    {selectedDate && (
                      <div className="p-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedDate(undefined)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Clear date
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Appointments</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-3">Customer</div>
                  <div className="col-span-3">Service</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-2">Staff</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>

                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="grid grid-cols-12 p-4 border-b last:border-0 items-center">
                      <div className="col-span-3">
                        <div className="font-medium">{appointment.customerName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.customerPhone}</div>
                      </div>
                      <div className="col-span-3">
                        <div>{appointment.serviceName}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{new Date(appointment.date).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                      <div className="col-span-2">{appointment.staffName || "Any available"}</div>
                      <div className="col-span-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : appointment.status === "cancelled"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No appointments found matching your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="today">
              {/* Today's appointments would go here */}
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Today's appointments would be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="upcoming">
              {/* Upcoming appointments would go here */}
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Upcoming appointments would be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Make changes to the appointment details.</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-service">Service</Label>
                <Select defaultValue={selectedAppointment.serviceId}>
                  <SelectTrigger id="edit-service">
                    <SelectValue placeholder="Select service" />
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

              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="edit-date">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedAppointment.date}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={new Date(selectedAppointment.date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Select defaultValue={selectedAppointment.time}>
                  <SelectTrigger id="edit-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-staff">Staff</Label>
                <Select defaultValue={selectedAppointment.staffId || "any"}>
                  <SelectTrigger id="edit-staff">
                    <SelectValue placeholder="Any available" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any available</SelectItem>
                    {staff.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} - {person.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedAppointment.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Appointment Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 shadow-lg">
            <Clock className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
            <DialogDescription>Create a new appointment for a customer.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-customer">Customer Name</Label>
              <Input id="new-customer" placeholder="Enter customer name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-phone">Phone Number</Label>
              <Input id="new-phone" placeholder="Enter phone number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-service">Service</Label>
              <Select>
                <SelectTrigger id="new-service">
                  <SelectValue placeholder="Select service" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="new-date">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-time">Time</Label>
                <Select>
                  <SelectTrigger id="new-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-staff">Staff</Label>
              <Select>
                <SelectTrigger id="new-staff">
                  <SelectValue placeholder="Any available" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any available</SelectItem>
                  {staff.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name} - {person.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
