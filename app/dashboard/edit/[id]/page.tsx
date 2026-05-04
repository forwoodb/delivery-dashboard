import { connectDb } from "@/app/lib/db";
import Trip from "@/app/models/Trip";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditPage = async ({ params }: PageProps) => {
  await connectDb();

  const { id } = await params;

  const editTrip = await Trip.findOne({ _id: id }).lean();
  console.log(editTrip);

  return (
    <div className="page-container flex flex-col items-center w-[95%] p-8 mx-auto">
      <h1>Edit Trip</h1>
      <form action="" className="flex flex-col p-4 ">
        <label className="input my-4">
          <span className="label">Area</span>
          <input type="text" />
        </label>
        <label className="input my-4">
          <span className="label">Date</span>
          <input type="text" />
        </label>
        <label className="input my-4">
          <span className="label">Time</span>
          <input type="text" />
        </label>
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
