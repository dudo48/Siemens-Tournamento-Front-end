import { PropsWithChildren } from "react";

interface Props {
  attributes?: {[key: string]: any}
}

const GradientButton1 = ({attributes, children}: PropsWithChildren<Props>) => {
  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:bg-tournamento-600 before:border-tournamento-800 before:border-2 before:opacity-0 hover:before:opacity-100 before:duration-200'
  const buttonStyle = 'relative z-10 py-2 px-8 text-white rounded-full bg-gradient-to-b from-75% from-tournamento-800 to-tournamento-700 hover:text-tournamento-800 duration-200'

  return (
    <button className={`${buttonStyle} ${beforeStyle}`} {...attributes}>
        {children}
    </button>
  );
}
 
export default GradientButton1;