import Layout from '@/src/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import  Head  from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="퍼스트 디센던트, 퍼스트 디센던트 정보, 퍼디, 퍼디 정보, 계승자, 무기, 모듈, 외장 부품, 반응로, 보상 로테이션" />
        <meta name="description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info" />
        <meta property="og:description" content="퍼스트 디센던트 정보 사이트" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info" />
        <meta name="twitter:description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="twitter:image" content="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CRKFG9WF5J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-CRKFG9WF5J');
        `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
