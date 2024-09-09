import RewardLayoutPage from '@/src/components/reward/layout/RewardLayoutPage'
import Head from 'next/head'

export default function RewardMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 보상 로테이션</title>
        <meta name="description" content="퍼스트 디센던트의 보상 로테이션을 모두 제공합니다." />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info - 보상 로테이션" />
        <meta property="og:description" content="퍼스트 디센던트의 보상 로테이션을 모두 제공합니다." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info - 보상 로테이션" />
        <meta name="twitter:description" content="퍼스트 디센던트의 보상 로테이션을 모두 제공합니다." />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <RewardLayoutPage />
    </>
  )
}
