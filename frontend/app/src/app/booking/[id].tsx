import { useRouter } from 'next/router';

async function getBookingById(id: number) {
  const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch booking');
  }

  return res.json();
}

const BookingDetails = async () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>; 
  }

  const booking = await getBookingById(Number(id));

  return (
    <div>
      <h1>This Booking is with {booking.doctor_name}</h1>
      <p>For {booking.service}</p>
      <p>It ends on {booking.end_time}</p>
      <button onClick={() => router.push('/')}>Back</button>
    </div>
  );
};

export default BookingDetails;
