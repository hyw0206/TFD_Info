import Layout from '@/src/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import  Head  from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Keyword" content="퍼스트 디센던트, 퍼스트 디센던트 정보, 퍼디, 퍼디 정보, 계승자, 무기, 외장 부품, 반응로, 보상 로테이션" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
