import { Descendant } from '@/src/data/descendant_type'

export default function DescendantSkillDetailPage(props: {
  descendantId: string
  skillId: string
}) {
  const descendantId = parseInt(props.descendantId)
  const skillId = parseInt(props.skillId)
  const datas: Descendant[] = require('@/src/data/descendant.json')
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
