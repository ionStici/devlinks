import Input from "./Input";

export default function Inputs({ data }) {
  const { email, firstName, lastName } = data;

  return (
    <div className="flex flex-col gap-3 mx-6 md:mx-10 p-5 bg-light_grey rounded-xl">
      <Input
        type="text"
        name="firstName"
        label="First name*"
        value={firstName}
        placeholder="e.g. John"
      />
      <Input
        type="text"
        name="lastName"
        label="Last name*"
        value={lastName}
        placeholder="e.g. Appleseed"
      />
      <Input
        type="email"
        name="email"
        label="Email"
        value={email}
        placeholder="e.g. email@example.com"
      />
    </div>
  );
}
