  // Component import
  import DescendantSkillDetailPage from './DescendantSkillDetailPage'
  import DescendantStatDetailPage from './DescendantStatDetailPage'

  // Type import
  import { Descendant } from '@/src/data/type/descendant_type'
  import { Module } from '@/src/data/type/module'

  // Hook import
  import { useEffect, useState } from 'react'

  // antd import
  import { Select, Slider, Space, Tooltip } from 'antd'

  // data import
  const datas: Descendant[] = require('@/src/data/json/descendant.json')
  const modules: Module[] = require('@/src/data/json/module.json')

  export default function DescendantDetailPage(props: { descendantId: string }) {
    // useState Hook Setting

    // 현재 내가 클릭한, 정보를 볼 skill
    const [skillId, setSkillId] = useState('0')
    // 현재 내가 정보를 볼 level
    const [level, setLevel] = useState('40')
    // 선택된 등급
    const [tierFilter, setTierFilter] = useState<string | null>('초월')
    // 선택된 소켓 타입
    const [socketTypeFilter, setSocketTypeFilter] = useState<string | null>(null)
    
    // 일반 변수

    // 현재 내가 정보를 볼 계승자 번호
    const descendantId = parseInt(props.descendantId)
    // 5개의 스킬 단축키명
    const skillNames = ['Q', 'C', 'V', 'Z', 'P'] 

    // 일반 함수


    // 바인딩 함수

    // 다른 스킬의 정보를 보고 싶을 때
    const onClickGetDetail = (id: string) => {
      if (skillId === id) return
      setSkillId(id)
    }
    const onChangeGetLevel2 = (selectLevel: number) => {
      const levelStr = String(selectLevel)
      if (level === levelStr) return
      setLevel(levelStr)
    }

    // 데이터 필터링 함수

    // 계승자 모듈 필터링
    const checkDescendantMatch = (module: Module) => {
      return module.module_class === "계승자" && (
        Number(module.module_id) < 254001001 ||
        (
          (Number(module.module_id) >= 254001001 && Number(module.module_id) <= 254001004) &&
          (datas[descendantId].descendant_name === "레픽" || datas[descendantId].descendant_name === "얼티밋 레픽") ||
          (Number(module.module_id) >= 254002001 && Number(module.module_id) <= 254002004) &&
          (datas[descendantId].descendant_name === "에이잭스" || datas[descendantId].descendant_name === "얼티밋 에이잭스") ||
          (Number(module.module_id) >= 254003001 && Number(module.module_id) <= 254003004) &&
          (datas[descendantId].descendant_name === "비에사" || datas[descendantId].descendant_name === "얼티밋 비에사") ||
          (Number(module.module_id) >= 254004001 && Number(module.module_id) <= 254004002) &&
          (datas[descendantId].descendant_name === "얼티밋 레픽") ||
          (Number(module.module_id) >= 254005001 && Number(module.module_id) <= 254005004) &&
          (datas[descendantId].descendant_name === "제이버") ||
          (Number(module.module_id) >= 254006001 && Number(module.module_id) <= 254006004) &&
          (datas[descendantId].descendant_name === "버니" || datas[descendantId].descendant_name === "얼티밋 버니") ||
          (Number(module.module_id) >= 254007001 && Number(module.module_id) <= 254007002) &&
          (datas[descendantId].descendant_name === "얼티밋 에이잭스") ||
          (Number(module.module_id) >= 254008001 && Number(module.module_id) <= 254008004) &&
          (datas[descendantId].descendant_name === "프레이나") ||
          (Number(module.module_id) >= 254009001 && Number(module.module_id) <= 254009004) &&
          (datas[descendantId].descendant_name === "글레이" || datas[descendantId].descendant_name === "얼티밋 글레이") ||
          (Number(module.module_id) >= 254009005 && Number(module.module_id) <= 254009006) &&
          datas[descendantId].descendant_name === "얼티밋 글레이" ||
          (Number(module.module_id) >= 254010001 && Number(module.module_id) <= 254010002) &&
          (datas[descendantId].descendant_name === "얼티밋 비에사") ||
          (Number(module.module_id) >= 254011001 && Number(module.module_id) <= 254011004) &&
          (datas[descendantId].descendant_name === "샤렌") ||
          (Number(module.module_id) >= 254012001 && Number(module.module_id) <= 254012004) &&
          (datas[descendantId].descendant_name === "루나") ||
          (Number(module.module_id) >= 254013001 && Number(module.module_id) <= 254013004) &&
          (datas[descendantId].descendant_name === "밸비" || datas[descendantId].descendant_name === "얼티밋 밸비") ||
          (Number(module.module_id) >= 254013005 && Number(module.module_id) <= 254013006) &&
          (datas[descendantId].descendant_name === "얼티밋 밸비") ||
          (Number(module.module_id) >= 254014001 && Number(module.module_id) <= 254014004) &&
          (datas[descendantId].descendant_name === "카일") ||
          (Number(module.module_id) >= 254015001 && Number(module.module_id) <= 254015004) &&
          (datas[descendantId].descendant_name === "에시모") ||
          (Number(module.module_id) >= 254016001 && Number(module.module_id) <= 254016004) &&
          (datas[descendantId].descendant_name === "엔조") ||
          (Number(module.module_id) >= 254017001 && Number(module.module_id) <= 254017004) &&
          (datas[descendantId].descendant_name === "유진") ||
          (Number(module.module_id) >= 254018001 && Number(module.module_id) <= 254018004) &&
          (datas[descendantId].descendant_name === "블레어") ||
          (Number(module.module_id) >= 254019001 && Number(module.module_id) <= 254019002) &&
          (datas[descendantId].descendant_name === "얼티밋 버니")
        )
      )
    }

    // 데이터 필터링
    const filteredModules = modules.filter(module => {
      const isTierMatch = tierFilter ? module.module_tier === tierFilter : true
      const isSocketTypeMatch = socketTypeFilter ? module.module_socket_type === socketTypeFilter : true
      const isDescendantMatch = checkDescendantMatch(module)
      return isTierMatch && isSocketTypeMatch && isDescendantMatch
    })
    
    // 스타일링 함수
    
    const setClassWithTier = (data: string) => {
      if (data === "일반") return "grade1" 
      if (data === "희귀") return "grade2" 
      if (data === "궁극") return "grade3" 
      if (data === "초월") return "grade4" 
      return "";
    }
    
    const setClassWithSocket = (data: string) => {
      if (data === "말라카이트") return "Malachite"
      if (data === "크산틱") return "Xantic"
      if (data === "루틸") return "Rutile"
      if (data === "알만딘") return "Almandine"
      if (data === "세룰리안") return "Cerulean"
      return ""
    }
    
    // useEffect Hook Setting

    // 내가 보고자 하는 계승자가 바뀌면, 보고자 하는 스킬 + 레벨값 초기로 돌리기
    useEffect(() => {
      setSkillId('0')
      setLevel('40')
    }, [descendantId])

    return (
      <div className="mt-8 m-auto">
        { 
          // 캐릭터 기본 정보
        }
        <div className="flex items-center">
          <img
            className="w-20 border-2 border-black shadow-lg"
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
              // 캐릭터 스킬
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
          <Slider 
            value={parseInt(level)}
            defaultValue={40}
            min={1}
            max={40}
            onChange={onChangeGetLevel2}
            style={{ width: 250}}
          />
         <span>Lv.{level}</span>
        </Space>
        <DescendantStatDetailPage
          descendantId={props.descendantId}
          level={level}
        />
        <div className="mt-12 mb-4 text-xl font-bold">
          장착 가능한 모듈 (마우스 올릴 시 자세한 설명)
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex mb-4">
            <Select
              style={{ width: 120, marginRight: 8 }}
              placeholder="등급 필터"
              value={tierFilter || '초월'}
              onChange={setTierFilter}
            >
              {['일반', '희귀', '궁극', '초월', '전체'].map(tier => (
                <Select.Option key={tier} value={tier === '전체' ? null : tier}>
                  {tier}
                </Select.Option>
              ))}
            </Select>
            <Select
              style={{ width: 180 }}
              placeholder="소켓 타입 필터"
              value={socketTypeFilter || '전체'}
              onChange={setSocketTypeFilter}
            >
              {['말라카이트', '크산틱', '루틸', '알만딘', '세룰리안', '전체'].map(socketType => (
                <Select.Option key={socketType} value={socketType === '전체' ? null : socketType}>
                  {socketType}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-wrap">
            {filteredModules.map((module, idx) => (
              <Tooltip title={
                <div className="flex flex-col w-60 p-2">
                  <div className="flex flex-row items-center justify-between pb-2 border-b font-bold">
                    <div className="text-lg">{module.module_name}</div>
                    <div>{module.module_tier}</div>
                  </div>
                  <div className="flex flex-row pt-2 pb-2">
                    <div><img className="w-20" src={module.image_url} /></div>
                    <div className="ml-4">
                      <div>수용량 </div>
                      <div>(최저 레벨~최대 레벨)</div>
                      <div>{module.module_stat[0].module_capacity}~{module.module_stat[module.module_stat.length-1].module_capacity}</div>
                    </div>
                  </div>
                  <div className="flex flex-row pt-1 pb-1 border-y border-gray text-center font-bold">
                    <div className="basis-1/2 border-r">
                      <div>모듈 소켓 타입</div>
                      <div>{module.module_socket_type}</div>
                    </div>
                    <div className="basis-1/2">
                      <div>모듈 클래스</div>
                      <div>{module.module_class}</div> 
                    </div>
                  </div>
                  <div className="flex flex-col pt-2 pb-2 border-b border-gray">
                    <div className="font-bold">최저 레벨 효과</div>
                    <div>{module.module_stat[0].value}</div>
                  </div>
                  <div className="flex flex-col pt-2 pb-2 border-b border-gray">
                    <div className="font-bold">최고 레벨 효과</div>
                    <div>{module.module_stat[module.module_stat.length-1].value}</div>
                  </div>
                </div>
              } key={module.module_id}>
                <div className="relative w-32 flex flex-col pb-2 cursor-pointer">
                  <div className="absolute flex bottom-24 left-10 w-12 p-0.5 text-center module_area">
                    <div className={`mr-0.5 w-6 h-6 ${setClassWithSocket(module.module_socket_type)}`}></div>
                    <div>{module.module_stat[0].module_capacity}</div>
                  </div>
                  <img className={`w-16 m-auto ${setClassWithTier(module.module_tier)}`} src={module.image_url} />
                  <div className="text-center text-sm">{module.module_name}</div>
                  <div className="text-center text-sm">{module.module_type ? module.module_type : "-"}</div>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    )
  }
