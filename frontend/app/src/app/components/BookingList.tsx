// src/components/BookingList.tsx
import Link from 'next/link';

interface Booking {
  id: number;
  date: string;
  start_time: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <ul className="mt-4">
      {bookings.map((booking) => (
        <li key={booking.id} className="mb-2">
          <Link href={`/booking/${booking.id}`}>
            A Booking on {booking.date} starting at {booking.start_time}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
