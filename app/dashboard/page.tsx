import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

const DeliveryPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <h1>Delivery Page</h1>
      <form action="" className="border border-black">
        <div className="input-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            className="border border-black"
          />
        </div>
      </form>
    </>
  );
};

export default DeliveryPage;
