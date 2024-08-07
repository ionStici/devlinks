import LinkInput from "./LinkInput";
import Button from "./Button";

export default function Form({ links }) {
  const clientLinks = [...links];

  return (
    <form className="flex flex-col mx-6 flex-grow">
      <div>
        <LinkInput />
      </div>

      <Button>Save</Button>
    </form>
  );
}
