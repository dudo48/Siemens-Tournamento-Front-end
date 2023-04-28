import Logo from "@/components/logo";
import SideNav from "@/components/side-nav";
import { PropsWithChildren, ReactNode } from "react";

const PrimaryLayout = ({children} : PropsWithChildren) => {
  return (
    <main className='min-h-screen flex'>
      <SideNav />
      <section className='flex-1'>
        <section className='px-4 py-2'>
          <div className='w-1/2'><Logo /></div>
        </section>
        <section className='px-4 py-1'>
          {children}
        </section>
      </section>
    </main>
  );
}
 
export default PrimaryLayout;