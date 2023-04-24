import Logo from "@/components/logo";
import { PropsWithChildren, ReactNode } from "react";

const SecondaryLayout = ({children} : PropsWithChildren) => {
  return (
    <main className='py-12 min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-tournamento-400 to-tournamento-600'>
      <div className='w-4/6 bg-white py-2 px-6 rounded-full'>
        <Logo />
      </div>
      {children}
    </main>
  );
}
 
export default SecondaryLayout;