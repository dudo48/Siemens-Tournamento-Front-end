import Logo from "@/components/images/logo";
import { UserContext } from "@/context/user-context";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";

const SecondaryLayout = ({children} : PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  // this layout is for logged in users only, so redirect otherwise
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router])

  // don't render anything
  if (user) return null;

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