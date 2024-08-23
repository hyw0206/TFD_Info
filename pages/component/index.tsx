import ComponentLayoutPage from '@/src/components/component/layout/ComponentLayout'
import Head from 'next/head'

export default function ComponentMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 외장 부품</title>
        <meta name="description" content="퍼스트 디센던트 외장 부품 정보를 모두 제공합니다." />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info - 외장 부품" />
        <meta property="og:description" content="퍼스트 디센던트 외장 부품 정보를 모두 제공합니다." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info - 외장 부품" />
        <meta name="twitter:description" content="퍼스트 디센던트 외장 부품 정보를 모두 제공합니다." />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <ComponentLayoutPage />
    </>
  )
}
