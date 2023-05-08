interface Props {
  attributes: {[key: string]: any}
}

const RoundedInput = ({attributes}: Props) => {
  return (
    <input
      className='px-4 py-1.5 rounded-full self-stretch'
      {...attributes}
    />
  );
}
 
export default RoundedInput;