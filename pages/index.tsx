import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  
  const url = 'https://open.api.nexon.com'

  useEffect(() => {
    // axios.get(`${url}/static/tfd/meta/ko/descendant.json`).then((r) => {
    //   console.log('des response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/weapon.json`).then((r) => {
    //   console.log('wea response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/module.json`).then((r) => {
    //   console.log('mod response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/reactor.json`).then((r) => {
    //   console.log('react response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/reward.json`).then((r) => {
    //   console.log('reward response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/stat.json`).then((r) => {
    //   console.log('stat response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/external-component.json`).then((r) => {
    //   console.log('compo response : ', r)
    // })
  }, [])

  return (
    <>
      <Head>
        <title>TFD Info</title>
      </Head>
      <div>
        <div className="text-center">상단의 메뉴로 이동해주세요.</div>
        <div className="text-center">각 무기 / 계승자 상세 페이지에서 장착 가능한 전체 모듈을 확인 가능합니다!</div>
      </div>
    </>
  )
}
