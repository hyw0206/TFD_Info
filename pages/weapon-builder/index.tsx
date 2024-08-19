import WeaponBuilderLayoutPage from '@/src/components/weapon-builder/layout/WeaponBuilderLayout'
import Head from 'next/head'

export default function WeaponBuilderMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 무기 빌더</title>
        <meta name="keywords" content="빌드, 세팅, 무기 세팅, 계승자 세팅, 빌더, 모듈 세팅, 모드, 모듈" />
      </Head>
      <WeaponBuilderLayoutPage />
    </>
  )
}
