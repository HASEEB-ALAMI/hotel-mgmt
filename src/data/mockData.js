import cabin001 from "./cabins/cabin-001.jpg";
import cabin002 from "./cabins/cabin-002.jpg";
import cabin003 from "./cabins/cabin-003.jpg";
import cabin004 from "./cabins/cabin-004.jpg";
import cabin005 from "./cabins/cabin-005.jpg";
import cabin006 from "./cabins/cabin-006.jpg";
import cabin007 from "./cabins/cabin-007.jpg";
import cabin008 from "./cabins/cabin-008.jpg";

export const mockCabins = [
  {
    id: 1,
    name: "Cabin 001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: cabin001,
    description: "A cozy cabin for couples with forest views.",
  },
  {
    id: 2,
    name: "Cabin 002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: cabin002,
    description: "Secluded retreat with a warm interior and hot tub deck.",
  },
  {
    id: 3,
    name: "Cabin 003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: cabin003,
    description: "Family-friendly cabin with modern amenities and fireplace.",
  },
  {
    id: 4,
    name: "Cabin 004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: cabin004,
    description: "Premium cabin with spacious living area and private deck.",
  },
  {
    id: 5,
    name: "Cabin 005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: cabin005,
    description: "Perfect for groups, with a full kitchen and outdoor seating.",
  },
  {
    id: 6,
    name: "Cabin 006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: cabin006,
    description: "Luxury group cabin with premium finish and hot tub.",
  },
  {
    id: 7,
    name: "Cabin 007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: cabin007,
    description: "Large cabin for big families, multiple living areas.",
  },
  {
    id: 8,
    name: "Cabin 008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: cabin008,
    description: "Grand cabin with premium details and stunning nature views.",
  },
];

export const mockSettings = {
  id: 1,
  minBookingLength: 2,
  maxBookingLength: 21,
  maxGuestPerBooking: 10,
  breakfastPrice: 15,
};

const mockGuests = [
  { id: 1, fullName: "Emma Watson", email: "emma@example.com" },
  { id: 2, fullName: "Marco Silva", email: "marco@example.com" },
  { id: 3, fullName: "Aya Johnson", email: "aya@example.com" },
  { id: 4, fullName: "Mohammed Ali", email: "mohammed@example.com" },
  { id: 5, fullName: "Maria Rodriguez", email: "maria@example.com" },
];

export const mockBookings = [
  {
    id: 101,
    created_at: "2026-03-10T10:15:00.000Z",
    startDate: "2026-04-02",
    endDate: "2026-04-05",
    status: "unconfirmed",
    isPaid: false,
    numGuests: 2,
    totalPrice: 750,
    cabins: mockCabins[1],
    guests: mockGuests[0],
  },
  {
    id: 102,
    created_at: "2026-03-12T14:05:00.000Z",
    startDate: "2026-03-20",
    endDate: "2026-03-23",
    status: "checked-out",
    isPaid: true,
    numGuests: 4,
    totalPrice: 1200,
    cabins: mockCabins[2],
    guests: mockGuests[1],
  },
  {
    id: 103,
    created_at: "2026-03-18T09:20:00.000Z",
    startDate: "2026-03-30",
    endDate: "2026-04-03",
    status: "checked-in",
    isPaid: true,
    numGuests: 3,
    totalPrice: 1600,
    cabins: mockCabins[5],
    guests: mockGuests[2],
  },
  {
    id: 104,
    created_at: "2026-03-21T16:40:00.000Z",
    startDate: "2026-04-10",
    endDate: "2026-04-12",
    status: "unconfirmed",
    isPaid: false,
    numGuests: 1,
    totalPrice: 950,
    cabins: mockCabins[3],
    guests: mockGuests[3],
  },
  {
    id: 105,
    created_at: "2026-03-25T12:00:00.000Z",
    startDate: "2026-04-18",
    endDate: "2026-04-21",
    status: "unconfirmed",
    isPaid: true,
    numGuests: 2,
    totalPrice: 1050,
    cabins: mockCabins[0],
    guests: mockGuests[4],
  },
];

export const mockDemoAccounts = [
  {
    id: 1,
    fullName: "Aya Johnson",
    email: "admin@hotel.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    fullName: "Marco Silva",
    email: "staff1@hotel.com",
    password: "staff123",
    role: "staff",
  },
  {
    id: 3,
    fullName: "Fatima Khan",
    email: "staff2@hotel.com",
    password: "staff123",
    role: "staff",
  },
  {
    id: 4,
    fullName: "John Doe",
    email: "guest1@hotel.com",
    password: "guest123",
    role: "guest",
  },
  {
    id: 5,
    fullName: "Emma Watson",
    email: "guest2@hotel.com",
    password: "guest123",
    role: "guest",
  },
];
