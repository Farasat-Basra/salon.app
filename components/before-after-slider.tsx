"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return

    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setSliderPosition(percentage)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div ref={containerRef} className={cn("relative w-full aspect-square overflow-hidden rounded-lg", className)}>
      {/* After image (full width) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage || "/placeholder.svg"}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 px-2 py-1 rounded text-xs font-medium">After</div>
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: `${100 / (sliderPosition / 100)}%` }}
        />
        <div className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 rounded text-xs font-medium">Before</div>
      </div>

      {/* Slider control */}
      <div className="absolute inset-y-0 z-10" style={{ left: `calc(${sliderPosition}% - 1px)` }}>
        <div className="absolute inset-y-0 w-0.5 bg-white"></div>
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
