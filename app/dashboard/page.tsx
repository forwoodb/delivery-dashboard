import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import Trip from "../models/Trip";
import { connectDb } from "../lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

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
  const trips = await Trip.find({}).lean();

  console.log(trips);

  // Create new trip
  const createTripAction = async (formData: FormData) => {
    "use server";

    const area = formData.get("area");

    const newTrip = await new Trip({ area, userId });
    await newTrip.save();

    revalidatePath("/dashboard");
  };

  // Delete a trip
  const deleteTripAction = async (formData: FormData) => {
    "use server";

    const id = formData.get("id");

    await Trip.findByIdAndDelete(id);

    revalidatePath("/dashboard");
  };

  return (
    <>
      <div className="page-container w-[95%] mx-auto">
        {/* <h1>Delivery Page</h1> */}
        <form action={createTripAction} className="flex justify-center py-8">
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
                  {/* <td>{trip.createdAt}</td> */}
                  <td>{trip.createdAt.toLocaleDateString()}</td>
                  <td>{trip.createdAt.toLocaleTimeString()}</td>
                  <td>
                    <Link
                      href={`/dashboard/edit/${trip._id.toString()}`}
                      className="btn"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <form action={deleteTripAction}>
                      <input
                        type="hidden"
                        name="id"
                        defaultValue={trip._id.toString()}
                      />
                      <button className="btn">Delete</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeliveryPage;
