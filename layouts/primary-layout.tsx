import Logo from "@/components/images/logo";
import LoadingFullscreen from "@/components/misc/loading-full-screen";
import LoadingSpinner from "@/components/misc/loading-spinner";
import SideNav from "@/components/misc/side-nav";
import NotificationsContextProvider from "@/context/notifications-context";
import { UserContext } from "@/context/user-context";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import {FiMenu} from "react-icons/fi"

const PrimaryLayout = ({children} : PropsWithChildren) => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const router = useRouter();
  const { authLoading, user } = useContext(UserContext);

  // this layout is for logged in users only, so redirect otherwise
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, router, authLoading])
  
  // close sidebar on route change
  useEffect(() => {
    setSideBarVisible(false);
  }, [router.asPath])

  return (!user || authLoading) ? <LoadingFullscreen /> : (
    <>
      <Head>
        <title>Tournamento: Your favourite tournament manager!</title>
      </Head>
      <NotificationsContextProvider>
        <main className='min-h-screen'>
          <section className={`${sideBarVisible ? 'w-full' : 'w-0'} md:w-80 flex fixed z-40 h-full gap-8 flex-col bg-gradient-to-br from-tournamento-400 to-tournamento-600 overflow-hidden duration-500`}>
            <SideNav hideSideNav={() => setSideBarVisible(false)} />
          </section>
          <section className='md:ml-80 flex-1 relative z-0'>
            <div className='p-1 flex items-center gap-1'>
              <button className='md:hidden' onClick={() => setSideBarVisible(true)}>
                <BsList className='text-4xl' />
              </button>
              <div className=''><Logo /></div>
            </div>
            <section className='px-4 py-1 flex flex-col gap-4'>
              {children}
            </section>
          </section>
        </main>
      </NotificationsContextProvider>
    </>
  );
}
 
export default PrimaryLayout;