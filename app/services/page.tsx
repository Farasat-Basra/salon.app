"use client"

import { useState } from "react"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories, services } from "@/lib/data"
import { Search } from "lucide-react"

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter services based on search query and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || service.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Discover our range of premium salon and spa services.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setActiveCategory("all")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
