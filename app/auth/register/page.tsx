import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const registerAction = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    redirect("/dashboard");
  };

  return (
    <>
      <h1>Register</h1>
      <AuthForm mode={`register`} formAction={registerAction} />
    </>
  );
};

export default RegisterPage;
