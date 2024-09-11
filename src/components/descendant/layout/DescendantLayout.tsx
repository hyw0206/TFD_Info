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

  // 선택된 계승자 id
  const [descendantId, setDescendantId] = useState('101000021')

  // 바인딩 함수
  
  // 클릭 시 세부 정보 가져오는 바꾸기
  const onClickGetDetail = (id: string) => {
    // 리렌더링 방지 (현재 보여지는 정보와 내가 누른 정보가 같을 경우)
    if (descendantId === id) return
    setDescendantId(id)
  }
  const groupedDescendants = datas.reduce((groups: any, descendant: Descendant) => {
    const category = descendant.descendant_skill[1].element_type;
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(descendant)
    return groups
  }, {})
  const setCategoryIcon = (category: string) => {
    if (category === "독성") return "/toxic.png";
    if (category === "냉기") return "/chill.png";
    if (category === "화염") return "/fire.png";
    if (category === "전기") return "/electric.png";
    if (category === "무 속성") return "/none.png";
  }
  return (
    <div className="max-w-4xl m-auto p-4">
      <nav className="fixed top-20 right-4 w-28 area text-center z-50 text-white">
        <ul>
          <div className='py-2'>빠른 이동 탭</div>
          <li className='pt-2 border-t-2'><a href="#descendant">계승자 목록</a></li>
          <li className='pt-2'><a href="#information">계승자 정보</a></li>
          <li className='pt-2'><a href="#farming">계승자 파밍</a></li>
          <li className='py-2'><a href="#module">계승자 모듈</a></li>
        </ul>
      </nav>
      <div className="mt-8 mb-4 ml-6 text-2xl font-bold" id="descendant">계승자</div>
      <div className="mt-2 ml-4 pt-2 pb-2 pl-4 text-lg text-white area">
        계승자 목록
      </div>
      <div className="flex flex-wrap ml-4 border cursor-pointer">
        {
          // 계승자 목록을 가져와서 list 형태로 배열
        }
           {Object.keys(groupedDescendants).map((category, index) => (
        <div key={index} className="mt-4 min-w-full">
          {/* 카테고리별 아이콘과 이름 표시 */}
          <div className="flex items-center ml-4">
            <img src={`./category${setCategoryIcon(category)}`} className="text-green-500 mr-2" alt={category} />
            <div className="text-lg font-bold">{category}</div>
          </div>

          {/* 계승자 목록 */}
          <div className="flex flex-wrap ml-4 cursor-pointer">
            {groupedDescendants[category].map((data: Descendant, idx: number) => (
              <div
                key={data.descendant_id}
                className="w-32 mt-2 fix:w-40"
                onClick={() => onClickGetDetail(String(data.descendant_id))}
              >
                <img
                  className="w-12 m-auto border-2 border-black shadow-lg fix:w-16 dark:border-white dark:border-1"
                  src={data.descendant_image_url}
                  alt={data.descendant_name}
                />
                <div className="text-lg text-center">{data.descendant_name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      </div>
      <DescendantDetailPage descendantId={descendantId} />
    </div>
  )
}