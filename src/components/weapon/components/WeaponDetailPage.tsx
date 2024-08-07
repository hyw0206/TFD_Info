// Component import
import WeaponStatDetailPage from "./WeaponStatDetailPage";

// Type import
import { Weapon } from "@/src/data/type/weapon_type";

// Hook import
import { useState } from "react";

// etc import
import { WeaponType } from "@/src/data/etc/weaponvars";

// data import
const datas: Weapon[] = require("@/src/data/json/weapon.json");

export default function WepaonDetailPage(props: {weaponRoundTypeid: string, weaponTypeid: string}) {

  // useState Hook Setting
  
  // 정보를 볼 무기의 index
  const [weaponNumber, setWeaponNumber] = useState("0");

  // 일반 변수

  // 무기 계열 
  const weaponRoundTypeid = props.weaponRoundTypeid;
  // 무기 종류
  const weaponTypeid = props.weaponTypeid;

  // 일반 함수

  // 불러온 데이터에서, 사용자가 정보를 보려고 누른 무기 찾기
  const findWeaponNumber = (key: string): void => {
    const result = datas.findIndex((weapon) => weapon.weapon_id == key);
    if (weaponNumber === String(result)) return; // 리렌더링 방지
    setWeaponNumber(String(result));
  }

  return (
    <>
      {
        datas?.filter(weapon =>  
          weapon.weapon_type === WeaponType[parseInt(weaponRoundTypeid)].weaponType[parseInt(weaponTypeid)]
        ).map((weapon, idx) => {
          return (
            <div key={weapon.weapon_name + weapon.weapon_id}>
              <div className="flex cursor-pointer" key={weapon.weapon_id} id={String(idx)} onClick={() => findWeaponNumber(weapon.weapon_id)}>
                <div className="w-12 h-12 mr-4 fix:w-20">
                  <img className="w-12 h-8 p-0.5 border-2 border-black object-cover weapon fix:w-20 fix:h-10" src={weapon.image_url} />
                </div>
                <div className="w-20 mr-4 fix:w-32">
                  <div className="w-20 text-sm fix:text-base fix:w-auto">{weapon.weapon_name}</div>
                  <div className="text-xs opacity-75">{weapon.weapon_tier}</div>
                </div>
                <div>
                  {
                    weapon.weapon_perk_ability_description !== null ?
                    <>
                      <div>{weapon.weapon_perk_ability_name}</div>
                      <div className="hidden max-w-xl text-xs opacity-75 fix:block">{weapon.weapon_perk_ability_description}</div>
                    </>
                    : <div className="leading-10">특성 없음</div>
                  }
                </div>
              </div>
            </div>
          )
        })
      }
      <hr className="mt-4 mb-4" />
      <WeaponStatDetailPage weaponNumber={weaponNumber} />
      </>
  )
}