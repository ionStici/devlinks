import { getUser, resetPassword } from "@/actions/auth";
import { redirect } from "next/navigation";
import Footer from "../_components/Footer";
import Form from "../_components/Form";
import Header from "../_components/Header";
import Input from "../_components/Input";

export const metadata = {
  title: "Reset Your Password",
  description: "Securely reset your devlinks password.",
};

export default async function Page() {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <>
      <Header
        heading="Reset Your Password"
        content="Securely reset your devlinks password."
      />
      <Form action={resetPassword} btnText="Reset Password">
        <Input
          label="Current Password"
          type="password"
          name="current-password"
          placeholder="Confirm your current password"
          autofill="current-password"
        />
        <Input
          label="New Password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
      </Form>
      <Footer
        content="Changed your mind?"
        btnText={`${user.email.slice(1)}`}
        href={user.email}
      />
    </>
  );
}
