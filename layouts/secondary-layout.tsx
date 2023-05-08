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

  // don't render anything
  if (user) return <LoadingFullscreen />;

  return (
    <>
    <Head>
      <title>Tournamento: Join now and you won&apos;t regret it!</title>
    </Head>
    <main className='py-12 min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-tournamento-400 to-tournamento-600'>
      <div className='w-4/6 bg-white py-2 px-6 rounded-full'>
        <Logo />
      </div>
      {children}
    </main>
    </>
  );
}
 
export default SecondaryLayout;