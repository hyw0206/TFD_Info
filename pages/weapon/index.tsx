import WeaponLayoutPage from '@/src/components/weapon/layout/WeaponLayout'
import Head from 'next/head'

export default function WeaponMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 무기</title>
        <meta name="keywords" content="무기, 모듈, 일반탄, 특수탄, 충격탄, 고위력탄, 모듈, 천둥우리, 비단뱀, 천벌, 비밀정원, 나제스트라의 헌신, 평화 중재자, 집행자" />
      </Head>
      <WeaponLayoutPage />
    </>
  )
}
