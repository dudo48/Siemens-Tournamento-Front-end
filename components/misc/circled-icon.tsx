import { IconType } from "react-icons";

interface Props {
  icon: IconType
}

const CircledIcon = ({icon: Icon}: Props) => {
  return (
    <div className='border-2 p-0.5 border-tournamento-400 rounded-full'>
      <Icon className='text-3xl text-tournamento-400' />
    </div>
  );
}
 
export default CircledIcon;