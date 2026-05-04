import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/db";
import { redirect } from "next/navigation";

const LoginPage = () => {
  connectDb();

  const loginAction = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/dashboard");
  };
  return (
    <>
      <h1>Login Page</h1>
      <AuthForm mode={`login`} formAction={loginAction} />
    </>
  );
};

export default LoginPage;
