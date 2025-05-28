"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { MoonStar, Sun, Monitor } from "lucide-react"

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [primaryColor, setPrimaryColor] = useState("#f9d1e0") // Default pink

  const handleColorChange = (color: string) => {
    setPrimaryColor(color)
    // In a real app, this would update CSS variables or a theme configuration
    document.documentElement.style.setProperty("--primary", color)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your salon's basic information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Zahra Medical Salon" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Phone Number</Label>
                    <Input id="business-phone" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email Address</Label>
                    <Input id="business-email" defaultValue="info@Zahra Medicalsalon.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-website">Website</Label>
                    <Input id="business-website" defaultValue="https://Zahra Medicalsalon.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address">Address</Label>
                  <Textarea id="business-address" defaultValue="123 Beauty Street, New York, NY 10001" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    defaultValue="Zahra Medical Salon is your destination for beauty, relaxation, and self-care. We offer a comprehensive range of hair, nail, and spa services."
                    rows={4}
                  />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>Set your salon's operating hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Switch id={`${day.toLowerCase()}-open`} defaultChecked={day !== "Sunday"} />
                        <Label htmlFor={`${day.toLowerCase()}-open`}>{day}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          className="w-32"
                          defaultValue={day !== "Sunday" ? "09:00" : "10:00"}
                          disabled={day === "Sunday"}
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          className="w-32"
                          defaultValue={day === "Saturday" ? "18:00" : day === "Sunday" ? "16:00" : "20:00"}
                          disabled={day === "Sunday"}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="mt-6">Save Hours</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of your salon booking app.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Color Mode</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-8 w-8" />
                        <span>Light</span>
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                        onClick={() => setTheme("dark")}
                      >
                        <MoonStar className="h-8 w-8" />
                        <span>Dark</span>
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                        onClick={() => setTheme("system")}
                      >
                        <Monitor className="h-8 w-8" />
                        <span>System</span>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Primary Color</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {[
                        { name: "Pink", value: "#f9d1e0" },
                        { name: "Purple", value: "#d8b4fe" },
                        { name: "Blue", value: "#93c5fd" },
                        { name: "Green", value: "#86efac" },
                        { name: "Yellow", value: "#fef08a" },
                        { name: "Orange", value: "#fdba74" },
                        { name: "Red", value: "#fca5a5" },
                        { name: "Teal", value: "#5eead4" },
                        { name: "Indigo", value: "#a5b4fc" },
                        { name: "Gray", value: "#d1d5db" },
                      ].map((color) => (
                        <div
                          key={color.name}
                          className={`flex flex-col items-center gap-2 cursor-pointer p-2 rounded-md ${
                            primaryColor === color.value ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleColorChange(color.value)}
                        >
                          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color.value }} />
                          <span className="text-xs">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Border Radius</Label>
                        <p className="text-sm text-muted-foreground">Adjust the roundness of UI elements</p>
                      </div>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Animation Speed</Label>
                        <p className="text-sm text-muted-foreground">Control the speed of UI animations</p>
                      </div>
                      <Select defaultValue="normal">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button>Save Appearance Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Appointment</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an email when a new appointment is booked
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Appointment Reminder</Label>
                        <p className="text-sm text-muted-foreground">
                          Send reminder emails to clients before their appointment
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Review</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a new review is submitted</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Appointment</Label>
                        <p className="text-sm text-muted-foreground">Receive an SMS when a new appointment is booked</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Appointment Reminder</Label>
                        <p className="text-sm text-muted-foreground">
                          Send reminder SMS to clients before their appointment
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Reminder Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Reminder Time</Label>
                        <Select defaultValue="24">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour before</SelectItem>
                            <SelectItem value="2">2 hours before</SelectItem>
                            <SelectItem value="24">24 hours before</SelectItem>
                            <SelectItem value="48">48 hours before</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Reminder Method</Label>
                        <Select defaultValue="both">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email only</SelectItem>
                            <SelectItem value="sms">SMS only</SelectItem>
                            <SelectItem value="both">Both Email and SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced settings for your salon booking app.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Booking Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Minimum Booking Notice</Label>
                          <Select defaultValue="2">
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No minimum</SelectItem>
                              <SelectItem value="1">1 hour</SelectItem>
                              <SelectItem value="2">2 hours</SelectItem>
                              <SelectItem value="24">24 hours</SelectItem>
                              <SelectItem value="48">48 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Maximum Booking Window</Label>
                          <Select defaultValue="60">
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">1 week</SelectItem>
                              <SelectItem value="14">2 weeks</SelectItem>
                              <SelectItem value="30">1 month</SelectItem>
                              <SelectItem value="60">2 months</SelectItem>
                              <SelectItem value="90">3 months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Cancellations</Label>
                          <p className="text-sm text-muted-foreground">Allow clients to cancel their appointments</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Rescheduling</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow clients to reschedule their appointments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">System Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Debug Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable debug mode for troubleshooting</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable PWA Features</Label>
                          <p className="text-sm text-muted-foreground">Enable Progressive Web App features</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Button>Save Advanced Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>These actions are destructive and cannot be undone.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reset Application</h4>
                      <p className="text-sm text-muted-foreground">Reset all settings to default values</p>
                    </div>
                    <Button variant="outline">Reset</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Clear All Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Delete all appointments, services, and customer data
                      </p>
                    </div>
                    <Button variant="destructive">Clear Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
