import { PropsWithChildren } from "react";

interface Props {
  attributes?: {[key: string]: any},
  type: string
}

const GradientButton = ({attributes, type, children}: PropsWithChildren<Props>) => {
  const buttonTypeStyle: { [key: string]: string } = {
    dark: 'bg-gradient-to-b from-tournamento-800 to-tournamento-700 before:bg-tournamento-600',
    light: 'bg-gradient-to-b from-tournamento-600 to-tournamento-400 hover:before:bg-tournamento-800',
    red: 'bg-gradient-to-b from-red-600 to-red-400 hover:before:bg-red-900'
  }

  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:opacity-0 hover:before:opacity-100 before:duration-200'
  const buttonStyle = 'font-semibold relative z-10 py-1 px-4 text-base text-white rounded-full duration-200'

  return (
    <button className={`${buttonStyle} ${beforeStyle} ${buttonTypeStyle[type]}`} {...attributes}>
        {children}
    </button>
  );
}
 
export default GradientButton;