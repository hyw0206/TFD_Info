import WepaonDetailPage from "../components/WeaponDetailPage";
import { WeaponType } from "@/src/data/etc/weaponvars";
import React, { useState } from "react"

export default function WeaponLayout() {
  // 무기 계열
  const [weaponRoundTypeId, setWeaponRoundTypeId] = useState("0");
  // 무기 종류
  const [weaponTypeId, setWeaponTypeId] = useState("0"); 
  
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
      <div className="mt-8 mb-4 ml-6 text-2xl font-bold">무기</div>
      <div className="mt-2 ml-4 pt-2 pb-2 pl-4 text-lg text-white area">무기 분류</div>
      <div className="ml-4">
        {
          WeaponType.map((type, idx) => {
            return (
              <>
                <div key={idx + type.weaponRoundType} className="flex p-2">
                  <div className="w-20 text-center">{type.weaponRoundType}</div>
                  <div className="flex">
                    {
                      type.weaponType.map((weaponType, idx2) => {
                        return (
                          <>
                            <div onClick={onClickWeaponNav} id={idx + " " + idx2} className={weaponRoundTypeId === String(idx) && weaponTypeId === String(idx2) ?
                              "mr-2 font-bold cursor-pointer" : "mr-2 cursor-pointer"
                            }>{weaponType}</div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
      <div className="flex pt-4 pb-4">
        <div className="w-64 pt-2 pb-2 text-center areagray">아이템 이름</div>
        <div className="grow pt-2 pb-2 text-center areagray">특성 정보</div>
      </div>
      <WepaonDetailPage weaponRoundTypeid={weaponRoundTypeId} weaponTypeid={weaponTypeId} />
    </div>
  )
}