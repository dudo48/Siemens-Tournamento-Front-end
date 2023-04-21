interface Props {
  attributes: {[key: string]: any},
  children: React.ReactNode
}

const Form = ({attributes, children}: Props) => {
  return (
    <form {...attributes} className='w-full flex flex-col items-center gap-4 py-4'>
      {children}
    </form>
  );
}

export default Form;