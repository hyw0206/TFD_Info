import WeaponLayoutPage from '@/src/components/weapon/layout/WeaponLayout'
import Head from 'next/head'

export default function WeaponMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 무기</title>
        <meta name="description" content="퍼스트 디센던트 무기의 파밍 정보, 스탯, 고유 능력, 모듈에 관한 정보를 제공합니다." />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info - 무기" />
        <meta property="og:description" content="퍼스트 디센던트 무기의 스탯, 고유 능력, 모듈에 관한 정보를 제공합니다." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info - 무기" />
        <meta name="twitter:description" content="퍼스트 디센던트 무기의 스탯, 고유 능력, 모듈에 관한 정보를 제공합니다." />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <WeaponLayoutPage />
    </>
  )
}
