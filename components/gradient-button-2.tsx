import { PropsWithChildren } from "react";

interface Props {
  attributes?: {[key: string]: any}
}

const GradientButton2 = ({attributes, children}: PropsWithChildren<Props>) => {
  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:bg-tournamento-800 before:opacity-0 hover:before:opacity-100 before:duration-200'
  const buttonStyle = 'relative z-10 py-1 px-2 text-white text-sm font-semibold rounded-full bg-gradient-to-b from-tournamento-600 to-tournamento-400'

  return (
    <button className={`${buttonStyle} ${beforeStyle}`} {...attributes}>
        {children}
    </button>
  );
}
 
export default GradientButton2;