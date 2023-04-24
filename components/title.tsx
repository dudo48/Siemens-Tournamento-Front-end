import { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => {
  const afterStyle = 'after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-8 after:bg-gradient-to-r after:from-tournamento-400 after:to-tournamento-700'

  return (
    <h1 className={`relative text-2xl mb-4 ${afterStyle}`}>{children}</h1>
  );
}
 
export default Title;