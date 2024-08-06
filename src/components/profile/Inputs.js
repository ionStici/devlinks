import Input from "./Input";

export default function Inputs({ user: { email, user_metadata } }) {
  const { firstName, lastName } = user_metadata;

  return (
    <div className="flex flex-col gap-3 mx-6 p-5 bg-light_grey rounded-xl md:mx-10">
      <Input
        type="text"
        name="firstName"
        label="First name*"
        value={firstName}
      />
      <Input type="text" name="lastName" label="Last name*" value={lastName} />
      <Input type="email" name="email" label="Email" value={email} />
    </div>
  );
}
