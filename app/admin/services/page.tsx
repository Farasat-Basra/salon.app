"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { categories, services } from "@/lib/data"
import { Clock, DollarSign, Edit, Plus, Search, Trash } from "lucide-react"

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleEditService = (service: (typeof services)[0]) => {
    setSelectedService(service)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Service Management</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>Create a new service to offer to your customers.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Service Title</Label>
                    <Input id="new-title" placeholder="Enter service title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea id="new-description" placeholder="Enter service description" rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-price">Price ($)</Label>
                      <Input id="new-price" type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-duration">Duration (min)</Label>
                      <Input id="new-duration" type="number" placeholder="60" min="15" step="15" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-category">Category</Label>
                    <Select>
                      <SelectTrigger id="new-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-image">Image URL</Label>
                    <Input id="new-image" placeholder="Enter image URL" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="new-featured" />
                    <Label htmlFor="new-featured">Featured Service</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">Create Service</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                  {service.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">${service.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded-full">{service.category}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditService(service)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No services found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Make changes to the service details.</DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Service Title</Label>
                <Input id="edit-title" defaultValue={selectedService.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedService.description} rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input id="edit-price" type="number" defaultValue={selectedService.price} min="0" step="0.01" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (min)</Label>
                  <Input id="edit-duration" type="number" defaultValue={selectedService.duration} min="15" step="15" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select defaultValue={selectedService.category}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input id="edit-image" defaultValue={selectedService.image} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="edit-featured" defaultChecked={selectedService.featured} />
                <Label htmlFor="edit-featured">Featured Service</Label>
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
    </div>
  )
}
