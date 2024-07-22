import { Descendant } from '@/src/data/type/descendant_type'

export default function DescendantSkillDetailPage(props: {
  descendantId: string
  skillId: string
}) {
  // 정보를 볼 계승자 id
  const descendantId = parseInt(props.descendantId)
  // 정보를 볼 스킬 id
  const skillId = parseInt(props.skillId)

  // 계승자 데이터 불러오기
  const datas: Descendant[] = require('@/src/data/json/descendant.json')
  return (
    <>
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-500">
          {datas[descendantId].descendant_skill[skillId].skill_name}
        </div>
        <div className="mt-1 mb-2 text-sm font-bold text-gray-400">
          {datas[descendantId].descendant_skill[skillId].element_type ==
          '무 속성'
            ? datas[descendantId].descendant_skill[skillId].element_type
            : datas[descendantId].descendant_skill[skillId].element_type +
              ' 속성'}{' '}
          /{' '}
          {datas[descendantId].descendant_skill[skillId].arche_type !== null
            ? datas[descendantId].descendant_skill[skillId].arche_type
            : '무'}{' '}
          타입
        </div>
        <div>
          {datas[descendantId].descendant_skill[skillId].skill_description}
        </div>
      </div>
    </>
  )
}
