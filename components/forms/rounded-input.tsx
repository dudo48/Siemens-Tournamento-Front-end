interface Props {
  attributes: {[key: string]: any}
}

const RoundedInput = ({attributes}: Props) => {
  return (
    <input
      className='w-full px-4 py-2 rounded-full'
      {...attributes}
    />
  );
}
 
export default RoundedInput;