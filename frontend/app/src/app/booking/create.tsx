import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateBooking = () => {
  const [service, setService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = { service, doctor_name: doctorName, start_time: startTime, end_time: endTime, date };

    try {
      const res = await fetch('http://host.docker.internal:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create booking');
      }
      router.push('/');

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Create a Booking</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Service:
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Doctors Name:
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
