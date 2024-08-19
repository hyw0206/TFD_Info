import DescendantBuilderPage from '@/src/components/descendant-builder/layout/DescendantBuilderLayout'
import Head from 'next/head'

export default function DescendantBuilderMainPage() {
  return (
    <>
      <Head>
        <title>TFD Info - 계승자 빌더</title>
        <meta name="keywords" content="빌드, 세팅, 무기 세팅, 계승자 세팅, 빌더, 모듈 세팅, 모드, 모듈" />
      </Head>
      <DescendantBuilderPage />
    </>
  )
}
