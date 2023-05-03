import UserContextProvider from '@/context/user-context'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  return (
    <UserContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </UserContextProvider>
  );
}

export default App;