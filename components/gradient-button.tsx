import { PropsWithChildren } from "react";

interface Props {
  attributes?: {[key: string]: any},
  type: string
}

const GradientButton = ({attributes, type, children}: PropsWithChildren<Props>) => {
  const typesStyle: { [key: string]: string } = {
    dark: 'bg-gradient-to-b from-tournamento-800 to-tournamento-700 before:bg-tournamento-600 before:border-tournamento-800 before:border-2',
    light: 'bg-gradient-to-b from-tournamento-600 to-tournamento-400 hover:before:bg-tournamento-800',
    danger: 'bg-gradient-to-b from-red-600 to-red-400 hover:before:bg-red-900',
  }

  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:opacity-0 hover:before:opacity-100 before:duration-200'
  const buttonStyle = 'font-semibold relative z-10 py-0.5 px-4 text-white rounded-full duration-200'

  return (
    <button className={`${buttonStyle} ${beforeStyle} ${typesStyle[type]}`} {...attributes}>
        {children}
    </button>
  );
}
 
export default GradientButton;