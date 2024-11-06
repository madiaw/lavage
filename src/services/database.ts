import { BookingData } from '../types';

const BOOKINGS_KEY = 'auto_lavage_pro_bookings';

export const saveBooking = (booking: BookingData): number => {
  const bookings = getBookings();
  const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id || 0)) + 1 : 1;
  const newBooking = { ...booking, id: newId };
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newId;
};

export const getBookings = (): BookingData[] => {
  const bookingsJson = localStorage.getItem(BOOKINGS_KEY);
  return bookingsJson ? JSON.parse(bookingsJson) : [];
};

export const updateBooking = (id: number, updatedBooking: Partial<BookingData>): void => {
  const bookings = getBookings();
  const index = bookings.findIndex(booking => booking.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updatedBooking };
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
};

export const deleteBooking = (id: number): void => {
  const bookings = getBookings();
  const updatedBookings = bookings.filter(booking => booking.id !== id);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
};