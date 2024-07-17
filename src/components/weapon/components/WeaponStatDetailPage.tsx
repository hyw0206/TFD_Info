import { Stat, Basestat } from '@/src/data/stat'
import { Weapon } from '@/src/data/weapon_type'
import { useEffect, useState } from 'react'
import { Flex, Progress, Select, Space } from 'antd'
import { StatInfo } from '@/src/data/statinfo'

export default function WeaponStatDetailPage(props: { weaponNumber: string }) {
  const [datas, setDatas] = useState<Weapon[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [statInfo, setStatInfo] = useState<StatInfo>()
  const [level, setLevel] = useState('160')
  const [isLoading, setIsLoading] = useState(true)
  const levelOptions = Array.from({ length: 160 }, (_, i) => ({
    value: `${i + 1}`,
    label: `LV.${i + 1}`,
  }))
  const onChangeGetLevel = (level: string) => {
    setLevel(level)
  }
  const weaponNumber = Number(props.weaponNumber)
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
    const fetchData = async () => {
      const weaponData = await import('@/src/data/weapon.json')
      const statData = await import('@/src/data/stat.json')
      const statInfoData = await import('@/src/data/statInfo.json')
      setDatas(weaponData.default)
      setStats(statData.default)
      setStatInfo(statInfoData.default)
      setIsLoading(false)
      setLevel('160')
    }
    fetchData()
  }, [])
  const getStatName = (id: string): string => {
    const result = stats?.find((stat) => stat.stat_id === id)
    return result ? result.stat_name : 'error'
  }
  const calculatePercentageOfStat = (value: number, statName: string) => {
    const { min, max, average } = statInfo[statName]

    let percent = parseInt((value / max) * 100)
    return percent < 2 ? 2 : percent
  }
  if (isLoading) {
    return <div>최초 무기 정보 로딩중..</div>
  }
  return (
    <>
      <div className="mb-4 text-xl">
        <strong>{datas[weaponNumber].weapon_name}</strong> 정보
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-16 w-36 mr-4">
            <img
              className="p-1 weapon h-14 w-36 object-cover"
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
          <div className="w-48 text-right mr-4 text-lg">
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
                <div className="w-48 text-right mr-4 text-lg">
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
    </>
  )
}
