import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";

interface Props {
  name: string
}

const ConnectionLi = ({name}: Props) => {
  return (
    <ListItem icon={BsPerson} title={name}>
      <button>
        <BsX className='text-4xl hover:text-red-600 duration-200' />
      </button>
    </ListItem>
  );
}
 
export default ConnectionLi;