import Layout from '@/src/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="naver-site-verification" content="eba98bbf9cbf6aea7a04c2e0664ccfb04da74d1e" />
        <meta name="google-site-verification" content="Bj-S5JYAz0S3_WfSna66mTxZZoxADZEnle3Au_Hhga8" />
        <meta name="google-adsense-account" content="ca-pub-8273624756633692" />
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8273624756633692"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </>
  )
}
