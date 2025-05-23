import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Staff } from "@/lib/data"

interface StaffCardProps {
  staff: Staff
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image src={staff.image || "/placeholder.svg"} alt={staff.name} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{staff.name}</CardTitle>
        <CardDescription>{staff.role}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {staff.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
