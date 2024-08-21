import Head from "next/head";
import { useRouter } from "next/router";
import SearchLayoutPage from "@/src/components/Search/latout/SearchLayoutPage";

export default function searchPage() {
  const router = useRouter();
  const nickname = router.query.nickname;

  console.log(`index in nick : ${nickname}`)
  return (
    <>
      <Head>
        <title>TFD Info - 검색</title>
      </Head>
      {
        nickname ?
        <SearchLayoutPage nickname={String(nickname)} />
        :
        <div>닉네임 오류</div>
      }
    </>
  )
}