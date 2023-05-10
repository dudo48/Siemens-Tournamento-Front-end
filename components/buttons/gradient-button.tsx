import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface Props {
  attributes?: {[key: string]: any},
  type: string,
  icon?: IconType,
  grayscale?: boolean
}

const GradientButton = ({attributes, type, icon: Icon, grayscale, children}: PropsWithChildren<Props>) => {
  const buttonTypeStyle: { [key: string]: string } = {
    dark: 'bg-gradient-to-b from-tournamento-800 to-tournamento-700 before:bg-tournamento-600',
    light: 'bg-gradient-to-b from-tournamento-600 to-tournamento-400 before:bg-tournamento-800',
    orange: 'bg-gradient-to-b from-orange-600 to-orange-400 before:bg-orange-900',
    red: 'bg-gradient-to-b from-red-600 to-red-400 before:bg-red-900',
  }

  const beforeStyle = 'before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:rounded-full before:opacity-0 enabled:hover:before:opacity-100 before:duration-200'
  const buttonStyle = 'font-semibold relative z-10 py-1 px-3 text-base text-white rounded-full duration-200'

  return (
    <button className={`${buttonStyle} ${beforeStyle} ${buttonTypeStyle[type]} ${grayscale && 'grayscale'}`} {...attributes}>
        <div className='flex gap-2 items-center'>
          {Icon && <Icon className='text-xl' />}
          {children && <div>{children}</div>}
        </div>
    </button>
  );
}
 
export default GradientButton;