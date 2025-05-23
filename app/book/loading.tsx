import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <Skeleton className="h-12 w-[300px] md:w-[400px]" />
        <Skeleton className="h-6 w-[250px] md:w-[500px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <Skeleton className="w-10 h-10 rounded-full mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <Skeleton className="h-1 w-full" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[72px]" />
            <Skeleton className="h-[72px]" />
          </div>

          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  )
}
