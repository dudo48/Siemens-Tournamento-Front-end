import { PropsWithChildren } from "react";

const Subtitle = ({ children }: PropsWithChildren) => {
  const beforeStyle = 'before:absolute before:bottom-1 before:-left-2 before:w-1 before:h-4 before:bg-gradient-to-t before:from-tournamento-400 before:to-tournamento-700';

  return (
    <h2 className={`relative text-xl my-4 font-bold ${beforeStyle}`}>{children}</h2>
  );
}
 
export default Subtitle;