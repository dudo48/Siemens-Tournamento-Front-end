interface Props {
  attributes: {[key: string]: any}
}

const Input = ({attributes}: Props) => {
  return (
    <input
      className='w-full h-10 px-4 py-1 rounded-full'
      {...attributes}
    />
  );
}
 
export default Input;