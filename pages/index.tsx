import axios from 'axios'
import { useEffect } from 'react'

export default function Home() {
  
  const url = 'https://open.api.nexon.com'

  useEffect(() => {
    // axios.get(`${url}/static/tfd/meta/ko/descendant.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/weapon.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/module.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/reactor.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/reward.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/stat.json`).then((r) => {
    //   console.log('response : ', r)
    // })
    // axios.get(`${url}/static/tfd/meta/ko/external-component.json`).then((r) => {
    //   console.log('response : ', r)
    // })
  }, [])

  return (
    <div>
      <div className="text-center">상단의 메뉴로 이동해주세요.</div>
      <div className="text-center">각 무기 / 계승자 상세 페이지에서 장착 가능한 전체 모듈을 확인 가능합니다!</div>
    </div>
  )
}
