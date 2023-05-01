import { PropsWithChildren } from "react";

interface Props {
  type: string
}

const StateLabel = ({ type, children }: PropsWithChildren<Props>) => {
  const typeStyle: { [key: string]: string } = {
    light: 'bg-gradient-to-b from-tournamento-600 to-tournamento-400',
    red: 'bg-gradient-to-b from-red-600 to-red-400',
    orange: 'bg-gradient-to-b from-orange-600 to-orange-400',
  }

  return (
    <div className={`font-semibold py-0.5 px-4 rounded text-white ${typeStyle[type]}`}>
      {children}
    </div>
  );
}
 
export default StateLabel;