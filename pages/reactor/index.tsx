import ReactorLayoutPage from '@/src/components/reactor/layout/ReactorLayoutPage'
import Head from 'next/head'

export default function ReactorMainPage() {
  return (
    <>
      <Head>
      <title>TFD Info - 반응로</title>
      <meta name="description" content="퍼스트 디센던트의 반응로 정보를 모두 제공합니다." />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="author" content="hyw0206" />
      <meta property="og:title" content="TFD Info - 반응로" />
      <meta property="og:description" content="퍼스트 디센던트의 반응로 정보를 모두 제공합니다." />
      <meta property="og:image" content="/logo.webp" />
      <meta property="og:url" content="https://tfdinfo.vercel.app/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TFD Info - 반응로" />
      <meta name="twitter:description" content="퍼스트 디센던트의 반응로 정보를 모두 제공합니다." />
      <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <ReactorLayoutPage />
    </>
  )
}
