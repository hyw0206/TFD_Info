import DescendantSkillDetailPage from './DescendantSkillDetailPage'
import DescendantStatDetailPage from './DescendantStatDetailPage'
import { useEffect, useState } from 'react'
import { Select, Space } from 'antd'
import { Descendant } from '@/src/data/type/descendant_type'

export default function DescendantDetailPage(props: { descendantId: string }) {
  
  // 현재 내가 클릭한, 정보를 볼 skill
  const [skillId, setSkillId] = useState('0')
  // 현재 내가 정보를 볼 level
  const [level, setLevel] = useState('40')

  // 계승자 데이터 불러오기
  const datas: Descendant[] = require('@/src/data/json/descendant.json')

  // 현재 내가 정보를 볼 계승자 번호
  const descendantId = parseInt(props.descendantId)

  // 5개의 스킬 단축키명
  const skillNames = ['Q', 'C', 'V', 'Z', 'P'] 

  // 1~40레벨이 담길 배열
  const levelOptions = Array.from({ length: 40 }, (_, i) => ({
    value: `${i + 1}`,
    label: `LV.${i + 1}`,
  }))

  // 다른 레벨의 정보를 보고 싶을 때 
  const onChangeGetLevel = (selectLevel: string) => {
    // 리렌더링 방지
    if (level == selectLevel) return
    setLevel(selectLevel);
  }
  // 다른 스킬의 정보를 보고 싶을 때
  const onClickGetDetail = (id: string) => {
    // 리렌더링 방지
    if (skillId === id) return
    setSkillId(id)
  }
  
  useEffect(() => {
    // 내가 보고자 하는 계승자가 바뀌면, 보고자 하는 스킬 + 레벨값 초기로 돌리기
    setSkillId('0')
    setLevel('40')
  }, [descendantId])
  
  return (
    <div className="m-auto mt-8">
      <div className="flex items-center">
        <img
          className="w-20 border-2 border-black shaddw-lg"
          src={datas[descendantId].descendant_image_url}
        />
        <div className="ml-4 text-2xl font-bold">
          {datas[descendantId].descendant_name}
        </div>
      </div>
      <div className="mt-8 mb-4 text-xl">
        <strong>{datas[descendantId].descendant_name}</strong> 스킬
      </div>
      <div className="flex">
        {datas[descendantId].descendant_skill.map((skill, idx) => {
          return (
            <>
              <div
                id={String(idx)}
                className={
                  String(idx) === skillId
                    ? 'relative mr-4 selectedskill'
                    : 'relative mr-4'
                }
                key={skill.skill_name}
                onClick={() => onClickGetDetail(String(idx))}
              >
                <span className="absolute right-1 bottom-0 text-xl font-bold text-white">
                  {skillNames[idx]}
                </span>
                <img className="w-16 skill" src={skill.skill_image_url}></img>
              </div>
            </>
          )
        })}
      </div>
      <DescendantSkillDetailPage
        descendantId={props.descendantId}
        skillId={skillId}
      />
      <div className="mt-12 mb-4 text-xl">
        <strong>{datas[descendantId].descendant_name}</strong> 스탯
      </div>
      <Space wrap>
        <Select
          value={`LV.${level}`}
          style={{ width: 120, marginBottom: 8 }}
          options={levelOptions}
          onChange={onChangeGetLevel}
        />
      </Space>
      <DescendantStatDetailPage
        descendantId={props.descendantId}
        level={level}
      />
    </div>
  )
}