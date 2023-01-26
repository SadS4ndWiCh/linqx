import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';

import { Header } from '@/components/layout/Header';
import { ThemeProvider } from 'next-themes';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --roboto-font: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <div className='min-h-screen dark:bg-slate-900'>
          <Header />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}
