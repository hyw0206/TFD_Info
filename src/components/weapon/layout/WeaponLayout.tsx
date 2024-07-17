import React, { useState } from 'react'
import WepaonDetailPage from '../components/WeaponDetailPage'

export default function WeaponLayout() {
  const [weaponRoundTypeId, setWeaponRoundTypeId] = useState('0')
  const [weaponTypeId, setWeaponTypeId] = useState('0')
  const onClickWeaponNav = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const eventWeaponRoundTypeId = event.currentTarget.id.split(' ')[0]
    const eventWeaponTypeId = event.currentTarget.id.split(' ')[1]
    if (
      eventWeaponRoundTypeId === weaponRoundTypeId &&
      eventWeaponTypeId === weaponTypeId
    )
      return
    setWeaponRoundTypeId(eventWeaponRoundTypeId)
    setWeaponTypeId(eventWeaponTypeId)
  }
  const WeaponType = [
    {
      weaponRoundType: '일반탄',
      weaponType: ['권총', '기관단총', '기관총', '돌격소총'],
    },
    {
      weaponRoundType: '특수탄',
      weaponType: ['전술소총', '광선소총'],
    },
    {
      weaponRoundType: '충격탄',
      weaponType: ['핸드 캐논', '정찰소총'],
    },
    {
      weaponRoundType: '고위력탄',
      weaponType: ['산탄총', '저격총', '런처'],
    },
  ]
  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 mb-4 text-2xl font-bold">무기</div>
      <div className="mt-2 ml-4 pt-2 pl-4 pb-2 text-lg text-white area">
        무기 분류
      </div>
      <div className="ml-4">
        {WeaponType.map((type, idx) => {
          return (
            <>
              <div key={idx + type.weaponRoundType} className="p-2 flex">
                <div
                  className="w-20 text-center"
                  key={type.weaponRoundType + type.weaponType}
                >
                  {type.weaponRoundType}
                </div>
                <div className="flex">
                  {type.weaponType.map((weaponType, idx2) => {
                    return (
                      <>
                        <div
                          onClick={onClickWeaponNav}
                          id={idx + ' ' + idx2}
                          className={
                            weaponRoundTypeId === String(idx) &&
                            weaponTypeId === String(idx2)
                              ? 'mr-2 font-bold cursor-pointer'
                              : 'mr-2 cursor-pointer'
                          }
                        >
                          {weaponType}
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div className="flex pt-4 pb-4">
        <div className="w-64 text-center pt-2 pb-2 areagray">아이템 이름</div>
        <div className="grow text-center pt-2 pb-2 areagray">특성 정보</div>
      </div>
      <WepaonDetailPage
        weaponRoundTypeid={weaponRoundTypeId}
        weaponTypeid={weaponTypeId}
      />
    </div>
  )
}
