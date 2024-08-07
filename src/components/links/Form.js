import LinkInput from "./LinkInput";
import Button from "./Button";

import { addLink } from "@/actions/addLink";

export default function Form({ links }) {
  const clientLinks = [...links];

  return (
    <form action={addLink} className="flex flex-col mx-6 flex-grow">
      <div className="flex flex-col gap-6">
        {clientLinks.map((link, i) => {
          return <LinkInput key={i} link={link} />;
        })}
      </div>

      <Button>Save</Button>
    </form>
  );
}
