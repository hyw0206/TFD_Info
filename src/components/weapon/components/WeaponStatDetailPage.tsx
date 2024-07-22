import { useEffect, useState } from 'react'
import { Flex, Progress, Select, Space } from 'antd'
import { StatInfo } from '@/src/data/type/statinfo'
import { Weapon } from '@/src/data/type/weapon_type'
import { Stat, Basestat } from '@/src/data/type/stat'

export default function WeaponStatDetailPage(props: { weaponNumber: string }) {

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
  // 무기 데이터
  const [datas, setDatas] = useState<Weapon[]>([])
  // 스텟 데이터
  const [stats, setStats] = useState<Stat[]>([])
  // 스텟 평균값 데이터
  const [statInfo, setStatInfo] = useState<StatInfo>()
  // 내가 볼 무기 레벨 데이터
  const [level, setLevel] = useState('160')
  // 데이터 불러오기 전 까지는 로딩중 띄우기
  const [isLoading, setIsLoading] = useState(true)

  // 1~160레벨 세팅
  const levelOptions = Array.from({ length: 160 }, (_, i) => ({
    value: `${i + 1}`,
    label: `LV.${i + 1}`,
  }))

  // 다른 레벨의 정보를 보고 싶을 때
  const onChangeGetLevel = (selectLevel: string) => {
    // 리렌더링 방지
    if (level == selectLevel) return;
    setLevel(selectLevel)
  }

  // 내가 볼 무기 순서
  const weaponNumber = Number(props.weaponNumber);
  
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
      return String(stat.stat_value.toFixed(2))
    return stat.stat_value
  }

  useEffect(() => {
    // 데이터를 불러오고, 준비가 된다면 보여주기
    const fetchData = async () => {
      const weaponData = await import('@/src/data/json/weapon.json')
      const statData = await import('@/src/data/json/stat.json')
      const statInfoData = await import('@/src/data/json/statInfo.json')
      setDatas(weaponData.default)
      setStats(statData.default)
      setStatInfo(statInfoData.default)
      setLevel('160')
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // id 형태인 스탯을 이름으로 바꿔줌
  const getStatName = (id: string): string => {
    const result = stats?.find((stat) => stat.stat_id === id)
    return result ? result.stat_name : 'error'
  }
  // 스탯 값 하위 0~100% 계산
  const calculatePercentageOfStat = (value: number, statName: string) => {
    const { min, max, average } = statInfo[statName]

    let percent = parseInt((value / max) * 100)
    return percent < 2 ? 2 : percent
  }

  // 로딩 중 처리
  if (isLoading) {
    return <div>최초 무기 정보 로딩중..</div>
  }
  console.log(weaponNumber);

  return (
    <>
      <div className="mb-4 text-xl">
        <strong>{datas[weaponNumber].weapon_name}</strong> 정보
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-16 w-36 mr-4">
            <img
              className="h-14 w-36 p-1 object-cover weapon"
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
          <Select
            value={`LV.${level}`}
            style={{ width: 120, marginBottom: 8 }}
            options={levelOptions}
            onChange={onChangeGetLevel}
          />
        </Space>
        <div className="flex flex-row">
          <div className="w-48 mr-4 text-lg text-right">
            {getStatName(
              datas[weaponNumber].firearm_atk[Number(level) - 1].firearm[0]
                .firearm_atk_type,
            )}
          </div>
          <Flex style={{ width: 200 }}>
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
              <div className="flex flex-row" key={index}>
                <div className="w-48 mr-4 text-lg text-right">
                  {getStatName(stat.stat_id)}
                </div>
                <Flex style={{ width: 200 }}>
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
      <div>

      </div>
      <div className="mt-4 mb-4 text-xl">
        <strong>{datas[weaponNumber].weapon_name}</strong> 특성
      </div>
        <div className="pb-10">
          {
            datas[weaponNumber].weapon_perk_ability_image_url !== null ?
            <>
              <img className="w-16 mt-4 skill" src={datas[weaponNumber]?.weapon_perk_ability_image_url}></img>
              <div className="mt-4 text-2xl font-bold text-gray-500">
                {datas[weaponNumber].weapon_perk_ability_name}
              </div>  
              <div className="mt-2">
                {datas[weaponNumber].weapon_perk_ability_description}
              </div> 
            </>
          : 
          <div>
            특성 없음
          </div>
          }
        </div>
    </>
  )
}