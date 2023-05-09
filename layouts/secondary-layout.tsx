import Logo from "@/components/images/logo";
import LoadingFullscreen from "@/components/misc/loading-full-screen";
import { UserContext } from "@/context/user-context";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";

const SecondaryLayout = ({children} : PropsWithChildren) => {
  const { authLoading, user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/home');
    }
  }, [user, router, authLoading])

  return (user || authLoading) ? <LoadingFullscreen /> : (
    <>
      <Head>
        <title>Tournamento: Join now and you won&apos;t regret it!</title>
      </Head>
      <main className='fixed flex justify-center items-center inset-0 bg-gradient-to-b from-tournamento-400 to-tournamento-600'>
        <div className='h-full flex flex-col items-center justify-around'>
          <div className='bg-white py-2 px-6 rounded-full'>
            <Logo />
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
 
export default SecondaryLayout;