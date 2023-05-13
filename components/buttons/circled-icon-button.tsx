import { IconType } from "react-icons";

interface Props {
  attributes?: {[key: string]: any},
  icon: IconType
}

const CircledIconButton = ({attributes, icon: Icon}: Props) => {
  return (
    <button className='border-2 p-0.5 text-tournamento-400 border-tournamento-400 rounded-full hover:border-tournamento-800 hover:text-tournamento-800 duration-200' {...attributes}>
      <Icon className='text-2xl' />
    </button>
  );
}
 
export default CircledIconButton;