// Component import
import WepaonDetailPage from "../components/WeaponDetailPage";

// Hook import
import React, { useState } from "react"

// etc import
import { WeaponType } from "@/src/data/etc/weaponvars";

export default function WeaponLayout() {
  // useState Hook Setting

  // 무기 계열
  const [weaponRoundTypeId, setWeaponRoundTypeId] = useState("0");
  // 무기 종류
  const [weaponTypeId, setWeaponTypeId] = useState("0"); 
  
  // 바인딩 함수

  // 각 tag에 id로 남겨진 무기 계열, 종류를 확인하고 이에 맞는 데이터를 보여줌 (setState -> props 전달)
  const onClickWeaponNav = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const eventWeaponRoundTypeId = event.currentTarget.id.split(" ")[0];
    const eventWeaponTypeId = event.currentTarget.id.split(" ")[1];
    if (eventWeaponRoundTypeId === weaponRoundTypeId && eventWeaponTypeId === weaponTypeId) return;
    setWeaponRoundTypeId(eventWeaponRoundTypeId);
    setWeaponTypeId(eventWeaponTypeId);
  }

  return (
    <div className="max-w-4xl m-auto p-4">
      <nav className="fixed top-20 right-4 w-28 area text-center z-50 text-white">
        <ul>
          <div className='py-2'>빠른 이동 탭</div>
          <li className='pt-2 border-t-2'><a href="#weapon">무기 목록</a></li>
          <li className='pt-2'><a href="#information">무기 정보</a></li>
          <li className='pt-2'><a href="#attribute">무기 특성</a></li>
          <li className='py-2'><a href="#module">무기 모듈</a></li>
        </ul>
      </nav>
      <div className="mt-8 mb-4 ml-6 text-2xl font-bold" id="weapon">무기</div>
      <div className="mt-2 ml-4 pt-2 pb-2 pl-4 text-lg text-white area">무기 분류</div>
      <div className="ml-4">
        {
          WeaponType.map((type, idx) => {
            return (
              <div key={`weapon-round-${idx}`}>
                <div className="flex p-2">
                  <div className="flex justify-center items-center">
                    <img className="w-8 h-8 bg-black" src={`./rune/rune_${idx}.png`} alt={type.weaponRoundType} />
                    <div className="w-16 text-center text-sm fix:w-20 fix:text-base">{type.weaponRoundType}</div>
                  </div>
                  <div className="flex justify-center items-center">
                    {
                      type.weaponType.map((weaponType, idx2) => {
                        return (
                          <>
                            <div key={`weapon-${idx}-${idx2}`}  onClick={onClickWeaponNav} id={idx + " " + idx2} className={weaponRoundTypeId === String(idx) && weaponTypeId === String(idx2) ?
                              "mr-2 font-bold text-sm cursor-pointer fix:text-base" : "mr-2 text-sm cursor-pointer fix:text-base"
                            }>{weaponType}</div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
        
      </div>
      <div className="flex pt-4 pb-4">
        <div className="w-32 pr-2 pt-2 pb-2 text-center areagray fix:w-64 fix:pr-0 dark:bg-darkhf">아이템 이름</div>
        <div className="grow pt-2 pb-2 text-center areagray dark:bg-darkhf">특성 정보</div>
      </div>
      <WepaonDetailPage weaponRoundTypeid={weaponRoundTypeId} weaponTypeid={weaponTypeId} />
    </div>
  )
}