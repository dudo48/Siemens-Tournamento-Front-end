import UserContextProvider from '@/context/user-context'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  
  return (
    <>
      <UserContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </UserContextProvider>
      <ToastContainer position='bottom-center'
        transition={Slide}
        hideProgressBar
        bodyClassName='text-tournamento-800' />
    </>
  );
}

export default App;