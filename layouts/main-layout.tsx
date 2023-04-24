import Logo from "@/components/logo";
import SideNav from "@/components/side-nav";
import { PropsWithChildren, ReactNode } from "react";

const MainLayout = ({children} : PropsWithChildren) => {
  return (
    <main className='min-h-screen flex'>
      <SideNav />
      <section>
        <section className='px-4 py-2'>
          <div className='w-1/2'><Logo /></div>
        </section>
        <section className='p-4'>
          {children}
        </section>
      </section>
    </main>
  );
}
 
export default MainLayout;