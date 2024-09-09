import DescendantLayoutPage from '@/src/components/descendant/layout/DescendantLayout'
import Head from 'next/head'

export default function DescendantMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 계승자</title>
        <meta name="description" content="퍼스트 디센던트 계승자의 파밍 정보, 스탯, 스킬, 모듈에 관한 정보를 제공합니다." />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info - 계승자" />
        <meta property="og:description" content="퍼스트 디센던트 계승자의 파밍 정보, 스탯, 스킬, 모듈에 관한 정보를 제공합니다." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info - 계승자" />
        <meta name="twitter:description" content="퍼스트 디센던트 계승자의 파밍 정보, 스탯, 스킬, 모듈에 관한 정보를 제공합니다." />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <DescendantLayoutPage />
    </>
  )
}
