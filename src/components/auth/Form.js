import Button from "./Button";

export default function Form({ children, action, btnText }) {
  return (
    <form action={action} className="flex flex-col gap-6 mb-6">
      {children}
      <Button>{btnText}</Button>
    </form>
  );
}
