import { Descendant } from '@/src/data/type/descendant_type'

export default function DescendantStatDetailPage(props: {
  descendantId: string
  level: string
}) {
  // 정보를 볼 계승자 id
  const descendantId = parseInt(props.descendantId)
  // 정보를 볼 계승자 레벨 (index 접근 위해서 -1)
  const level = parseInt(props.level) - 1
  
  // 계승자 정보 불러오기
  const datas: Descendant[] = require('@/src/data/json/descendant.json')

  return (
    <div className="mb-6">
      {datas[descendantId].descendant_stat[level].stat_detail.map((stat) => {
        return (
          <>
            <div className="flex mt-2">
              <div className="w-44 text-xl text-center opacity-75">
                {stat.stat_type}
              </div>
              <div className="w-44 text-lg text-center">{stat.stat_value}</div>
            </div>
          </>
        )
      })}
    </div>
  )
}
