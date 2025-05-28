import { StaffCard } from "@/components/staff-card"
import { staff } from "@/lib/data"

export default function StaffPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our talented professionals are dedicated to providing you with exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((person) => (
          <StaffCard key={person.id} staff={person} />
        ))}
      </div>

      <div className="mt-16 bg-muted/50 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-2xl font-bold">Join Our Team</h2>
          <p className="max-w-[700px] text-muted-foreground">
            We're always looking for talented professionals to join our team. If you're passionate about beauty and
            customer service, we'd love to hear from you.
          </p>
          <div className="mt-4">
            <a
              href="mailto:careers@Zahra Medicalsalon.com"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Contact Us About Careers
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
