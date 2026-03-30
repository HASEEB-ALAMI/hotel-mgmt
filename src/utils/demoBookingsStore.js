import { mockBookings } from "../data/mockData";

const STORAGE_KEY = "dashboard.local_bookings";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function getLocalBookings() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(stored)) return stored;
  return [];
}

export function addLocalBooking(booking) {
  const existing = getLocalBookings();
  const next = [booking, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return booking;
}

export function getBookingsWithFallback(baseBookings) {
  const local = getLocalBookings();
  const data = Array.isArray(baseBookings) ? baseBookings : [];
  const merged = [...local, ...data];

  // Always ensure there is something to show (at least 5)
  if (merged.length >= 5) return merged;

  const existingIds = new Set(merged.map((b) => b?.id));
  const padded = [...merged, ...mockBookings.filter((b) => !existingIds.has(b.id))];
  return padded.slice(0, 5);
}

