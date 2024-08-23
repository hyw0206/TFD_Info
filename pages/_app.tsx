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
        <meta name="description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info" />
        <meta property="og:description" content="퍼스트 디센던트 정보 사이트" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info" />
        <meta name="twitter:description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="twitter:image" content="/logo.webp" />
        <meta name="google-site-verification" content="Bj-S5JYAz0S3_WfSna66mTxZZoxADZEnle3Au_Hhga8" />
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
        <Component {...pageProps}/>
      </Layout>
    </>
  )
}
