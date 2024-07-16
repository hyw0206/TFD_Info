import { Weapon } from "@/src/data/weapon_type";

export default function WepaonDetailPage(props: {weaponRoundTypeid: string, weaponTypeid: string}) {
  const datas: Weapon[] = require("@/src/data/weapon.json");
  const weaponRoundTypeid = props.weaponRoundTypeid 
  const weaponTypeid = props.weaponTypeid; 
  const WeaponType = [
    {
      weaponRoundType: "일반탄",
      weaponType: [
        "권총", 
        "기관단총",
        "기관총",
        "돌격소총"
      ]
    },
    {
      weaponRoundType: "특수탄",
      weaponType: [
        "전술소총", 
        "광선소총"
      ]
    },
    {
      weaponRoundType: "충격탄",
      weaponType: [
        "핸드 캐논", 
        "정찰소총",
      ]
    },
    {
      weaponRoundType: "고위력탄",
      weaponType: [
        "산탄총", 
        "저격총",
        "런처",
      ]
    },
  ]
  return (
    <>
      {
        datas?.filter(weapon =>  
          weapon.weapon_type === WeaponType[parseInt(weaponRoundTypeid)].weaponType[parseInt(weaponTypeid)]
        ).map((weapon) => {
          return (
            <>
              <div className="flex" key={weapon.weapon_id}>
                <div className="h-12 w-20 mr-4">
                  <img className="p-0.5 weapon h-10 w-20 border-2 border-black object-cover" src={weapon.image_url} />
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
                      <div className="text-xs opacity-75 max-w-xl">{weapon.weapon_perk_ability_description}</div>
                    </>
                    : <div className="leading-10">특성 없음</div>
                  }
                </div>
              </div>
            </>
          )
        })
      }
      <div className="mt-8 mb-4 text-xl"><strong>{datas[0].weapon_name}</strong> 정보</div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-16 w-16 mr-4">
            <img className="p-0.5 weapon h-12 w-16 object-cover" src={datas[0].image_url} />
          </div>
          <div className="flex flex-col">
            <div className="font-bold">{datas[0].weapon_name}</div>
            <div className="text-sm opacity-75">{datas[0].weapon_type} | {datas[0].weapon_rounds_type} | {datas[0].weapon_tier} 등급</div>
          </div>
        </div>
      </div>

      </>
  )
}