import Logo from "@/components/images/logo";
import SideNav from "@/components/misc/side-nav";
import { PropsWithChildren, ReactNode } from "react";

const PrimaryLayout = ({children} : PropsWithChildren) => {
  return (
    <main className='min-h-screen flex'>
      <section className='fixed h-full w-80 flex gap-8 flex-col bg-gradient-to-br from-tournamento-400 to-tournamento-600 break-all'>
        <SideNav />
      </section>
      <section className='flex-1 ml-80'>
        <div className='px-4 py-2'>
          <div className='w-1/2'><Logo /></div>
        </div>
        <section className='px-4 py-1'>
          {children}
        </section>
      </section>
    </main>
  );
}
 
export default PrimaryLayout;