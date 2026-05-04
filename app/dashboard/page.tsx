import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import Trip from "../models/Trip";
import { connectDb } from "../lib/db";

const DeliveryPage = async () => {
  await connectDb();

  // Get session info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Get user ID
  const userId = session.user.id;

  // Get trips
  const trips = await Trip.find({});
  console.log(trips);

  // Create new trip
  const createTripAction = async (formData: FormData) => {
    "use server";

    const area = formData.get("area");

    const newTrip = await new Trip({ area, userId });
    await newTrip.save();
  };

  return (
    <>
      <h1>Delivery Page</h1>
      <form action={createTripAction} className="flex justify-center">
        <label className="input">
          <span className="label">Area</span>
          <input type="text" name="area" required />
        </label>
        <button className="btn btn-primary">Add Trip</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => {
            return (
              <tr key={trip._id}>
                <td>{trip.area}</td>
                <td>{trip.createdAt.toLocaleDateString()}</td>
                <td>{trip.createdAt.toLocaleTimeString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DeliveryPage;
