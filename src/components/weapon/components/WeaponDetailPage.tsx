import WeaponStatDetailPage from "./WeaponStatDetailPage";
import { WeaponType } from "@/src/data/etc/weaponvars";
import { useState } from "react";
import { Weapon } from "@/src/data/type/weapon_type";

export default function WepaonDetailPage(props: {weaponRoundTypeid: string, weaponTypeid: string}) {

  // 정보를 볼 무기의 index
  const [weaponNumber, setWeaponNumber] = useState("0");

  // 무기 데이터 불러오기
  const datas: Weapon[] = require("@/src/data/json/weapon.json");
  
  // 불러온 데이터에서, 사용자가 정보를 보려고 누른 무기 찾기
  const findWeaponNumber = (key: string): void => {
    const result = datas.findIndex((weapon) => weapon.weapon_id == key);
    if (weaponNumber === String(result)) return; // 리렌더링 방지
    setWeaponNumber(String(result));
  }

  // 무기 계열 
  const weaponRoundTypeid = props.weaponRoundTypeid;
  // 무기 종류
  const weaponTypeid = props.weaponTypeid;

  return (
    <>
      {
        datas?.filter(weapon =>  
          weapon.weapon_type === WeaponType[parseInt(weaponRoundTypeid)].weaponType[parseInt(weaponTypeid)]
        ).map((weapon, idx) => {
          return (
            <>
              <div className="flex cursor-pointer" key={weapon.weapon_id} id={String(idx)} onClick={() => findWeaponNumber(weapon.weapon_id)}>
                <div className="w-20 h-12 mr-4">
                  <img className="h-10 w-20 p-0.5 border-2 border-black object-cover weapon" src={weapon.image_url} />
                </div>
                <div className="w-40">
                  <div>{weapon.weapon_name}</div>
                  <div className="text-xs opacity-75">{weapon.weapon_tier}</div>
                </div>
                <div>
                  {
                    weapon.weapon_perk_ability_description !== null ?
                    <>
                      <div>{weapon.weapon_perk_ability_name}</div>
                      <div className="max-w-xl text-xs opacity-75">{weapon.weapon_perk_ability_description}</div>
                    </>
                    : <div className="leading-10">특성 없음</div>
                  }
                </div>
              </div>
            </>
          )
        })
      }
      <hr className="mt-4 mb-4" />
      <WeaponStatDetailPage weaponNumber={weaponNumber} />
      </>
  )
}