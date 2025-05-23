// Mock data for the salon booking app

export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image: string
  category: string
  featured?: boolean
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

export interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  staffId?: string
  staffName?: string
  status: "confirmed" | "completed" | "cancelled"
}

export interface Staff {
  id: string
  name: string
  role: string
  image: string
  specialties: string[]
}

// Services data
export const services: Service[] = [
  {
    id: "haircut",
    title: "Signature Haircut & Style",
    description:
      "A personalized haircut and style tailored to your face shape and hair texture. Includes consultation, shampoo, and blow dry.",
    price: 65,
    duration: 60,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    category: "Hair",
    featured: true,
  },
  {
    id: "color",
    title: "Hair Color Treatment",
    description:
      "Full hair color service with premium products for vibrant, long-lasting results. Includes toner and style.",
    price: 95,
    duration: 120,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1969&auto=format&fit=crop",
    category: "Hair",
  },
  {
    id: "highlights",
    title: "Highlights & Balayage",
    description: "Custom highlights or balayage to add dimension and texture to your hair. Includes toner and style.",
    price: 125,
    duration: 150,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
    category: "Hair",
    featured: true,
  },
  {
    id: "manicure",
    title: "Luxury Manicure",
    description:
      "Rejuvenate your hands with our luxury manicure including exfoliation, massage, and premium polish application.",
    price: 45,
    duration: 45,
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
    category: "Nails",
  },
  {
    id: "pedicure",
    title: "Deluxe Spa Pedicure",
    description: "Pamper your feet with our deluxe pedicure including foot soak, exfoliation, massage, and polish.",
    price: 55,
    duration: 60,
    image: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=2070&auto=format&fit=crop",
    category: "Nails",
    featured: true,
  },
  {
    id: "facial",
    title: "Rejuvenating Facial",
    description:
      "Customized facial treatment to address your specific skin concerns. Includes cleansing, exfoliation, mask, and massage.",
    price: 85,
    duration: 60,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1970&auto=format&fit=crop",
    category: "Spa",
  },
  {
    id: "massage",
    title: "Relaxation Massage",
    description:
      "Full-body massage designed to reduce stress and promote relaxation. Customized pressure to your preference.",
    price: 90,
    duration: 60,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    category: "Spa",
  },
  {
    id: "waxing",
    title: "Full Body Waxing",
    description: "Smooth, hair-free skin with our gentle waxing services. Available for all body areas.",
    price: 75,
    duration: 60,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
    category: "Spa",
  },
]

// Reviews data
export const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely loved my haircut! The stylist really listened to what I wanted and delivered beyond my expectations.",
    date: "2023-04-15",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&crop=faces&faceindex=1",
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 4,
    comment: "Great massage service. The therapist was professional and the atmosphere was very relaxing.",
    date: "2023-04-10",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 5,
    comment: "The manicure was perfect! My nails have never looked better. Will definitely be back!",
    date: "2023-04-05",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&crop=faces&faceindex=1",
  },
  {
    id: "4",
    name: "David Kim",
    rating: 3,
    comment: "Good haircut, but had to wait a bit longer than expected. Service itself was great though.",
    date: "2023-03-28",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    rating: 5,
    comment: "The facial was amazing! My skin feels so refreshed and the esthetician gave me great skincare tips.",
    date: "2023-03-20",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&crop=faces&faceindex=1",
  },
]

// Appointments data
export const appointments: Appointment[] = [
  {
    id: "apt1",
    customerName: "Emma Wilson",
    customerPhone: "555-123-4567",
    customerEmail: "emma@example.com",
    serviceId: "haircut",
    serviceName: "Signature Haircut & Style",
    date: "2023-05-15",
    time: "10:00",
    staffId: "staff1",
    staffName: "Olivia Martinez",
    status: "confirmed",
  },
  {
    id: "apt2",
    customerName: "James Brown",
    customerPhone: "555-234-5678",
    serviceId: "massage",
    serviceName: "Relaxation Massage",
    date: "2023-05-16",
    time: "14:30",
    staffId: "staff3",
    staffName: "Daniel Lee",
    status: "confirmed",
  },
  {
    id: "apt3",
    customerName: "Sophia Garcia",
    customerPhone: "555-345-6789",
    customerEmail: "sophia@example.com",
    serviceId: "pedicure",
    serviceName: "Deluxe Spa Pedicure",
    date: "2023-05-14",
    time: "11:15",
    staffId: "staff2",
    staffName: "Ava Johnson",
    status: "completed",
  },
  {
    id: "apt4",
    customerName: "Liam Wilson",
    customerPhone: "555-456-7890",
    serviceId: "facial",
    serviceName: "Rejuvenating Facial",
    date: "2023-05-17",
    time: "16:00",
    staffId: "staff4",
    staffName: "Noah Williams",
    status: "confirmed",
  },
  {
    id: "apt5",
    customerName: "Olivia Taylor",
    customerPhone: "555-567-8901",
    customerEmail: "olivia@example.com",
    serviceId: "color",
    serviceName: "Hair Color Treatment",
    date: "2023-05-13",
    time: "09:30",
    staffId: "staff1",
    staffName: "Olivia Martinez",
    status: "cancelled",
  },
]

// Staff data
export const staff: Staff[] = [
  {
    id: "staff1",
    name: "Olivia Martinez",
    role: "Senior Stylist",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop&crop=faces&faceindex=1",
    specialties: ["Haircuts", "Color", "Styling"],
  },
  {
    id: "staff2",
    name: "Ava Johnson",
    role: "Nail Technician",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop&crop=faces&faceindex=1",
    specialties: ["Manicures", "Pedicures", "Nail Art"],
  },
  {
    id: "staff3",
    name: "Daniel Lee",
    role: "Massage Therapist",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop&crop=faces&faceindex=1",
    specialties: ["Swedish Massage", "Deep Tissue", "Hot Stone"],
  },
  {
    id: "staff4",
    name: "Noah Williams",
    role: "Esthetician",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&crop=faces&faceindex=1",
    specialties: ["Facials", "Waxing", "Skin Care"],
  },
]

// Categories
export const categories = [
  { id: "all", name: "All Services" },
  { id: "Hair", name: "Hair" },
  { id: "Nails", name: "Nails" },
  { id: "Spa", name: "Spa" },
]

// Analytics data
export const analyticsData = {
  appointmentsPerDay: [
    { day: "Monday", count: 12 },
    { day: "Tuesday", count: 16 },
    { day: "Wednesday", count: 15 },
    { day: "Thursday", count: 18 },
    { day: "Friday", count: 24 },
    { day: "Saturday", count: 30 },
    { day: "Sunday", count: 8 },
  ],
  topServices: [
    { name: "Signature Haircut & Style", count: 45 },
    { name: "Deluxe Spa Pedicure", count: 38 },
    { name: "Hair Color Treatment", count: 32 },
    { name: "Relaxation Massage", count: 28 },
    { name: "Rejuvenating Facial", count: 25 },
  ],
  revenueByCategory: [
    { category: "Hair", amount: 5840 },
    { category: "Nails", amount: 3250 },
    { category: "Spa", amount: 4120 },
  ],
  customerSatisfaction: {
    excellent: 68,
    good: 24,
    average: 6,
    poor: 2,
  },
}

// Promotions
export const promotions = [
  {
    id: "promo1",
    title: "Summer Special",
    description: "Get 20% off any spa package booked this month!",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2023-06-30",
  },
  {
    id: "promo2",
    title: "Refer a Friend",
    description: "Refer a friend and both get $15 off your next service!",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=2074&auto=format&fit=crop",
    expiryDate: "2023-12-31",
  },
  {
    id: "promo3",
    title: "First-Time Client",
    description: "New clients receive 15% off their first appointment!",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    expiryDate: "2023-12-31",
  },
]

// Time slots
export const timeSlots = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

// Helper function to get service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

// Helper function to get featured services
export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured)
}

// Helper function to get services by category
export function getServicesByCategory(category: string): Service[] {
  if (category === "all") return services
  return services.filter((service) => service.category === category)
}

// Helper function to get staff by ID
export function getStaffById(id: string): Staff | undefined {
  return staff.find((s) => s.id === id)
}
