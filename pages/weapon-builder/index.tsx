import WeaponBuilderLayoutPage from '@/src/components/weapon-builder/layout/WeaponBuilderLayout'
import Head from 'next/head'

export default function WeaponBuilderMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 무기 빌더</title>
        <meta name="description" content="퍼스트 디센던트 무기 모듈 빌더" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info - 무기 빌더" />
        <meta property="og:description" content="무기 모듈 빌더" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info - 무기 빌더" />
        <meta name="twitter:description" content="무기 모듈 빌더" />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <WeaponBuilderLayoutPage />
    </>
  )
}
