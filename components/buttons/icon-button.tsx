import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface Props {
  attributes?: {[key: string]: any},
  icon: IconType
}

const IconButton = ({ attributes, icon: Icon, children }: PropsWithChildren<Props>) => {
  return (
    <button className='flex items-center group gap-2 border-2 border-tournamento-400 rounded-full px-4 py-0.5 hover:bg-tournamento-400 duration-200' {...attributes}>
        <Icon className='text-tournamento-400 group-hover:text-tournamento-800 text-xl duration-200' />
        {children}
    </button>
  );
}
 
export default IconButton;