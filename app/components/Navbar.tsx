import Link from "next/link";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const signOutAction = async () => {
    "use server";

    await auth.api.signOut({
      headers: await headers(),
    });

    // redirect("/auth/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            {/* Mobile Nav */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link href={`/dashboard`}>Dashboard</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Delivery Dashboard</a>
        </div>
        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              {/* <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details> */}
            </li>
            <li>
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {session ? (
            <form action={signOutAction}>
              <button className="btn">Log Out</button>
            </form>
          ) : (
            <Link href={`/auth/login`} className="btn">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
