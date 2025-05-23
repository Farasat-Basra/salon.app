import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <Skeleton className="h-12 w-[300px] md:w-[400px]" />
        <Skeleton className="h-6 w-[250px] md:w-[500px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <Skeleton className="h-10 w-full md:w-[300px]" />
        <Skeleton className="h-10 w-full md:w-[400px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}
