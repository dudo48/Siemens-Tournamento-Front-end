interface Props {
  attributes: {[key: string]: any},
  children: React.ReactNode
}

const Button = ({attributes, children}: Props) => {
  return (
    <button
      className='py-2 px-8 text-white rounded-full bg-gradient-to-b from-50% from-tournamento-800 to-tournamento-700 hover:from-0%'
      {...attributes}
      >
        {children}
      </button>
  );
}
 
export default Button;