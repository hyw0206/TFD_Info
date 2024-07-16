import axios from 'axios'
import { useEffect } from 'react'
export default function Home() {
  const url = "https://open.api.nexon.com";
  useEffect(() => {
    axios.get((url + "/static/tfd/meta/ko/stat.json"))
    .then((r) => {
      console.log(r);
    })

  }, [])
  
  return (
    <>
      <a href="./descendant">계승자</a>
      
    </>
  )
}
