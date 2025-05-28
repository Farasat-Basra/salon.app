import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zahra Medical Salon Booking",
    short_name: "Zahra Medical",
    description: "Book your salon appointments with ease",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f9d1e0",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
