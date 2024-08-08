// Component import
import DescendantDetailPage from '../components/DescendantDetailPage'

// Type import
import { Descendant } from '@/src/data/type/descendant_type'

// Hook import
import { useState } from 'react'

// data import
const datas: Descendant[] = require('@/src/data/json/descendant.json')

export default function DescendantLayoutPage() {
  
  // useState Hook Setting

  // 선택된 계승자 id (기본 : 얼티밋 버니)
  const [descendantId, setDescendantId] = useState('18')

  // 바인딩 함수
  
  // 클릭 시 세부 정보 가져오는 바꾸기
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
        {
          // 계승자 목록을 가져와서 list 형태로 배열
        }
        {datas?.map((data: Descendant, idx: number) => {
          return (
            <div
              key={data.descendant_id}
              className="w-32 mt-2 fix:w-40"
              // idx 순서 == json 파일의 순서기에 idx 사용
              id={String(idx)}
              onClick={() => onClickGetDetail(String(idx))}
            >
              <img
                className="w-12 m-auto border-2 border-black shadow-lg fix:w-16 dark:border-white dark:border-1"
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