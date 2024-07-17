import DescendantDetailPage from '../components/DescendantDetailPage'
import { useState } from 'react'
import { Descendant } from '@/src/data/descendant_type'

export default function DescendantLayoutPage() {
  const datas = require('@/src/data/descendant.json')

  const [descendantId, setDescendantId] = useState('17')

  // 현재 내가 누른 descendant_id에 맞는 data를 로드한다.
  const onClickGetDetail = (id: string) => {
    // 리렌더링 방지 (현재 보여지는 정보와 내가 누른 정보가 같을 경우)
    if (descendantId === id) return
    setDescendantId(id)
  }

  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 mb-4 ml-6 text-2xl font-bold">계승자</div>
      <div className="mt-2 ml-4 pt-2 pb-2 pl-4 text-lg text-white area">
        계승자 목록
      </div>
      <div className="flex flex-wrap ml-4 border cursor-pointer">
        {datas?.map((data: Descendant, idx: number) => {
          return (
            <div
              key={data.descendant_id}
              className="w-40 mt-2"
              id={String(idx)}
              onClick={() => onClickGetDetail(String(idx))}
            >
              <img
                className="w-16 m-auto border-2 border-black shadow-lg"
                src={data.descendant_image_url}
                alt={data.descendant_name}
              />
              <div className="text-lg text-center">{data.descendant_name}</div>
            </div>
          )
        })}
      </div>
      <DescendantDetailPage descendantId={descendantId} />
    </div>
  )
}
