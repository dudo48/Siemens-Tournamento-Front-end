import { PropsWithChildren } from "react";

const Subtitle = ({ children }: PropsWithChildren) => {
  const beforeStyle = 'before:absolute before:top-2 before:-left-2 before:w-1 before:h-4 before:bg-gradient-to-t before:from-tournamento-400 before:to-tournamento-700';

  return (
    <h2 className={`relative text-lg mb-2 font-bold ${beforeStyle}`}>{children}</h2>
  );
}
 
export default Subtitle;