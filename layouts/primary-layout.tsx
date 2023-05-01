import Logo from "@/components/images/logo";
import SideNav from "@/components/misc/side-nav";
import { PropsWithChildren, ReactNode, useState } from "react";
import {FiMenu} from "react-icons/fi"

const PrimaryLayout = ({children} : PropsWithChildren) => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <main className='min-h-screen'>
      <section className={`${sideBarVisible ? 'w-full' : 'w-0'} md:w-80 flex fixed z-10 h-full gap-8 flex-col bg-gradient-to-br from-tournamento-400 to-tournamento-600 overflow-hidden duration-500`}>
        <SideNav hideSideNav={() => setSideBarVisible(false)} />
      </section>
      <section className='md:ml-80 flex-1 relative z-0'>
        <div className='px-4 py-2 flex items-center'>
          <button className='md:hidden' onClick={() => setSideBarVisible(true)}>
            <FiMenu className='text-3xl' />
          </button>
          <div className='w-3/4 md:w-1/2 mx-auto'><Logo /></div>
        </div>
        <section className='px-4 py-1 flex flex-col gap-4'>
          {children}
        </section>
      </section>
    </main>
  );
}
 
export default PrimaryLayout;