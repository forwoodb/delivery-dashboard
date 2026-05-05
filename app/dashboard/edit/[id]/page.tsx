import { connectDb } from "@/app/lib/db";
import Trip from "@/app/models/Trip";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditPage = async ({ params }: PageProps) => {
  await connectDb();

  const { id } = await params;

  const trip = await Trip.findOne({ _id: id }).lean();

  const date = new Date(trip.createdAt);
  const isoDate = date.toISOString().split("T")[0];
  const isoTime = date.toTimeString().slice(0, 5);

  // Update trip
  const updateTripAction = async (formData: FormData) => {
    "use server";
    const area = formData.get("area");
    const date = formData.get("date");
    const time = formData.get("time");

    const createdAt = new Date(`${date}T${time}:00`);

    const updateTrip = {
      area,
      createdAt,
    };

    await Trip.findByIdAndUpdate(id, updateTrip);

    redirect("/dashboard");
  };

  console.log(trip);

  return (
    <div className="page-container flex flex-col items-center w-[95%] p-8 mx-auto">
      <h1>Edit Trip</h1>
      <form action={updateTripAction} className="flex flex-col p-4 ">
        <label className="input my-4">
          <span className="label">Area</span>
          <input type="text" name="area" defaultValue={trip.area} />
        </label>
        <label className="input my-4">
          <span className="label">Date</span>
          <input type="date" name="date" defaultValue={isoDate} />
        </label>
        <label className="input my-4">
          <span className="label">Time</span>
          <input type="time" name="time" defaultValue={isoTime} />
        </label>
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
