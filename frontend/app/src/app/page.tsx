import Link from 'next/link';
import BookingList from './components/BookingList';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store'})
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {

  const bookings = await getBookings()

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1>Current bookings:</h1>
        <BookingList bookings={bookings}/>
        <div className="mt-4 flex justify-end w-full">
          <Link href="/booking/create">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Create a Booking
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
