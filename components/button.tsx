import { PropsWithChildren } from "react";

interface Props {
  attributes: {[key: string]: any}
}

const Button = ({attributes, children}: PropsWithChildren<Props>) => {
  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:scale-0 before:bg-gradient-to-b before:to-75% before:from-tournamento-800 before:to-tournamento-700 hover:before:scale-100 before:duration-100'
  const buttonStyle = 'relative z-10 py-2 px-8 text-white rounded-full bg-gradient-to-b from-75% from-tournamento-800 to-tournamento-700'

  return (
    <button className={`${buttonStyle} ${beforeStyle}`} {...attributes}>
        {children}
    </button>
  );
}
 
export default Button;