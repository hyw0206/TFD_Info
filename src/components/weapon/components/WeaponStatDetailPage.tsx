// Type import

import { Weapon, Basestat } from '@/src/data/type/weapon_type'
import { Stat } from '@/src/data/type/stat'
import { Module } from '@/src/data/type/module'
import { StatInfo } from '@/src/data/type/statinfo'

// Hook import

import { useEffect, useState } from 'react'

// antd import

import { Flex, Progress, Select, Space, Tooltip, Slider} from 'antd'
// data import

const datas: Weapon[] = require('@/src/data/json/weapon.json');
const stats: Stat[] = require('@/src/data/json/stat.json');
const statInfo: StatInfo[] = require('@/src/data/json/statInfo.json');
const moduleInfo: Module[] = require('@/src/data/json/module.json');

export default function WeaponStatDetailPage(props: { weaponNumber: string }) {
  // useState Hook Setting
  
  // 내가 볼 무기 레벨 데이터
  const [level, setLevel] = useState('100')
  // 데이터 불러오기 전 까지는 로딩중 띄우기

  // 필터링 상태
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [socketTypeFilter, setSocketTypeFilter] = useState<string | null>(null);

  // 일반 변수

  const wantStats = [
    '발사 속도',
    '약점 배율',
    '거리별 공격력 감소비율',
    '최대사거리',
    '장탄량',
    '재장전 시간',
    '이동 속도',
    '관통',
    '총기 치명타 확률',
    '총기 치명타 배율',
    '관통력',
    '속성 상태효과 부여확률',
  ]

  // 내가 볼 무기 순서
  const weaponNumber = Number(props.weaponNumber);

  // 일반 함수


  
  const onChangeGetLevel2 = (selectLevel: number) => {
    const levelStr = String(selectLevel)
    if (level === levelStr) return
    setLevel(String(levelStr))
  }

  // 일부 스탯 값 픽스
  const changeStatValue = (stat: Basestat): string => {
    if (['약점 배율', '총기 치명타 배율'].includes(getStatName(stat.stat_id)))
      return stat.stat_value + 'x'
    if (
      ['총기 치명타 확률', '속성 상태효과 부여확률'].includes(
        getStatName(stat.stat_id),
      )
    )
      return stat.stat_value + '%'
    if (['재장전 시간'].includes(getStatName(stat.stat_id)))
      return Number(stat.stat_value).toFixed(2)
    return String(stat.stat_value)
  }

  // id 형태인 스탯을 이름으로 바꿔줌
  const getStatName = (id: string): string => {
    const result = stats?.find((stat) => stat.stat_id === id)
    return result ? result.stat_name : 'error'
  }

  const calculatePercentageOfStat = (value: number, statName: string) => {
    // statInfo가 undefined일 경우, 기본값 처리
    if (!statInfo) return 0;
  
    // statInfo가 string 인덱스 시그니처를 갖도록 강제함
    const { min, max } = (statInfo as unknown as Record<string, { min: number; max: number }>)?.[statName] || { min: 0, max: 100 };
    
    // value를 number로 처리
    let percent = (value / max) * 100;
    percent = Math.min(Math.max(percent, 2), 100); // Ensure percent is between 2 and 100
    return Math.round(percent); // Return rounded percentage
  };


  // 데이터 필터링 함수
  
  // 모듈 필터링
  const filteredModules = moduleInfo.filter(module => {
    const isTierMatch = tierFilter ? module.module_tier === tierFilter : true;
    const isSocketTypeMatch = socketTypeFilter ? module.module_socket_type === socketTypeFilter : true;
    return isTierMatch && isSocketTypeMatch;
  });

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

  useEffect(() => {
    setLevel('100')
  
  }, [])
  
  return (
    <>
      <div className="mb-4 text-xl">
        <strong>{datas[weaponNumber].weapon_name}</strong> 정보
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-32 h-16 mr-4">
            <img
              className="w-32 h-14 p-1 object-cover weapon"
              src={datas[weaponNumber].image_url}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold">{datas[weaponNumber].weapon_name}</div>
            <div className="text-sm opacity-75">
              {datas[weaponNumber].weapon_type} |{' '}
              {datas[weaponNumber].weapon_rounds_type} |{' '}
              {datas[weaponNumber].weapon_tier} 등급
            </div>
          </div>
        </div>
        <Space wrap>  
          <Slider 
            value={parseInt(level)}
            defaultValue={100}
            min={1}
            max={160}
            onChange={onChangeGetLevel2} 
            style={{ width: 250}}
          />
         <span>Lv.{level}</span>
        </Space>
        <div className="flex flex-row">
          <div className="w-36 mr-4 text-sm text-right fix:w-48 fix:text-lg">
            {getStatName(
              datas[weaponNumber].firearm_atk[Number(level) - 1].firearm[0]
                .firearm_atk_type,
            )}
          </div>
          <Flex className="w-16 fix:w-52">
            <Progress
              percent={parseInt(
                (
                  (datas[weaponNumber].firearm_atk[Number(level) - 1].firearm[0]
                    .firearm_atk_value /
                    datas[weaponNumber].firearm_atk[159].firearm[0]
                      .firearm_atk_value) *
                  100
                ).toFixed(0),
              )}
              showInfo={false}
              size="small"
            />
          </Flex>
          <div className="ml-4 text-lg">
            {
              datas[weaponNumber].firearm_atk[Number(level) - 1].firearm[0]
                .firearm_atk_value
            }
          </div>
        </div>
        <div>{}</div>
        <div className="flex flex-col">
          {datas[weaponNumber].base_stat
            .filter((stat) => wantStats.includes(getStatName(stat.stat_id)))
            .map((stat, index) => (
              <div className="flex flex-row" key={stat.stat_id + index + stat.stat_value}>
                <div className="w-36 mr-4 text-sm text-right fix:w-48 fix:text-lg">
                  {getStatName(stat.stat_id)}
                </div>
                <Flex className="w-16 fix:w-52">
                  <Progress
                    percent={calculatePercentageOfStat(
                      Number(stat.stat_value),
                      getStatName(stat.stat_id),
                    )}
                    showInfo={false}
                    size="small"
                  />
                </Flex>
                <div className="ml-4 text-lg">{changeStatValue(stat)}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-4 mb-4 text-xl">
        <strong>{datas[weaponNumber].weapon_name}</strong> 특성
      </div>
      <div>
        {datas[weaponNumber]?.weapon_perk_ability_image_url ? (
          <>
            <img
              className="w-16 mt-4 skill"
              src={datas[weaponNumber].weapon_perk_ability_image_url || ''} // null을 빈 문자열로 변환
              alt={datas[weaponNumber].weapon_perk_ability_name || '무기 특성 이미지'} // alt 속성 추가
            />
            <div className="mt-4 text-2xl font-bold text-gray-500">
              {datas[weaponNumber].weapon_perk_ability_name}
            </div>
            <div className="mt-2">
              {datas[weaponNumber].weapon_perk_ability_description}
            </div>
          </>
        ) : (
          <div>
            특성 없음
          </div>
        )}
      </div>
      <div className="mt-4 mb-4 text-xl font-bold">
        장착 가능한 모듈 (마우스 올릴 시 자세한 설명)
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex mb-4">
          <Select
            style={{ width: 120, marginRight: 8 }}
            placeholder="등급 필터"
            value={tierFilter || '전체'}
            onChange={setTierFilter}
          >
            {['일반', '희귀', '궁극', '전체'].map(tier => (
              <Select.Option key={tier} value={tier === '전체' ? null : tier}>{tier}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 180 }}
            placeholder="소켓 타입 필터"
            value={socketTypeFilter || '전체'}
            onChange={setSocketTypeFilter}
          >
            { ['말라카이트', '크산틱', '루틸', '알만딘', '세룰리안', '전체'].map(socketType => (
              <Select.Option key={socketType} value={socketType === '전체' ? null : socketType}>{socketType}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-wrap">
          {filteredModules.filter(module =>
            module.module_class === datas[weaponNumber].weapon_rounds_type
          ).map((module, idx) => (
            <Tooltip title={
              <div className="flex flex-col w-60 p-2">
                <div className="flex flex-row items-center justify-between pb-2 border-b font-bold">
                  <div className="text-lg">{module.module_name}</div>
                  <div>{module.module_tier}</div>
                </div>
                <div className="flex flex-row pt-2 pb-2">
                  <div><img className="w-20" src={module.image_url} /></div>
                  <div className="ml-4">
                    <div>수용량</div>
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
            } key={module.image_url + idx}>
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
    </>
  )
}
