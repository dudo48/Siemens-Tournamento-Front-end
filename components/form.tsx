import { PropsWithChildren } from "react";

interface Props {
  attributes: {[key: string]: any}
}

const Form = ({attributes, children}: PropsWithChildren<Props>) => {
  return (
    <form {...attributes} className='w-full flex flex-col items-center gap-4 py-4'>
      {children}
    </form>
  );
}

export default Form;