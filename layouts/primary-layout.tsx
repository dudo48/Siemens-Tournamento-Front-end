import Logo from "@/components/images/logo";
import SideNav from "@/components/misc/side-nav";
import { UserContext } from "@/context/user-context";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import {FiMenu} from "react-icons/fi"

const PrimaryLayout = ({children} : PropsWithChildren) => {
  
  
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  // this layout is for logged in users only, so redirect otherwise
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router])
  
  // close sidebar on route change
  useEffect(() => {
    setSideBarVisible(false);
  }, [router.asPath])

  // don't render anything
  if (!user) return null;

  return (
    <>
      <Head>
        <title>Tournamento: Your favourite tournament manager!</title>
      </Head>
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
    </>
  );
}
 
export default PrimaryLayout;