
import { Stat } from "@/src/data/type/stat";
import { useState } from "react";

const datas: Component[] = require("@/src/data/json/component.json");
const stats: Stat[] = require("@/src/data/json/stat.json");

export default function ComponentLayoutPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedSetOption, setSelectedSetOption] = useState<string | null>(null);

  const getStatName = (id: string): string => {
    const result = stats?.find((stat) => stat.stat_id === id)
    return result ? result.stat_name : 'error'
  }
  const handleTypeFilterClick  = (type: string | null) => {
    if (selectedType == type) return;
    setSelectedType(type);
  }
  const handleStatFilterClick = (stat: string | null) => {
    if (selectedStat == stat) return;
    setSelectedStat(stat);
  }
  const handleTierFilterClick = (tier: string | null) => {
    if (selectedTier == tier) return;
    setSelectedTier(tier);
  }

  const handleSetOptionFilterClick = (setOption: string | null) => {
    if (selectedSetOption == setOption) return;
    setSelectedSetOption(setOption);
  }
  const filterData = datas.filter((data) => {
    const typeMatch = selectedType ? data.external_component_equipment_type === selectedType : true;
    const statMatch = selectedStat ? data.base_stat[0].stat_id === selectedStat : true;
    const tierMatch = selectedTier ? data.external_component_tier === selectedTier : true;
    const setOptionMatch = selectedSetOption ? data.set_option_detail[0]?.set_option === selectedSetOption : true;
    return typeMatch && statMatch && tierMatch && setOptionMatch;
  });

  const getButtonClass = (type: string | null, current: string | null) => {
    return type === current ? "rounded bg-blue-500 text-white " : "rounded bg-gray-500 text-white";
  }


  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 text-2xl font-bold">외장 부품 정보</div>
      <div className="mt-4 ml-6 text-lg">부품 종류</div>      
      <div className="flex mt-2 ml-6">
        <button className={`mr-2 p-2 ${getButtonClass('보조 전원', selectedType)}`} onClick={() => handleTypeFilterClick('보조 전원')}>보조 전원</button>
        <button className={`mr-2 p-2 ${getButtonClass('센서', selectedType)}`} onClick={() => handleTypeFilterClick('센서')}>센서</button>
        <button className={`mr-2 p-2 ${getButtonClass('메모리', selectedType)}`} onClick={() => handleTypeFilterClick('메모리')}>메모리</button>
        <button className={`mr-2 p-2 ${getButtonClass('처리 장치', selectedType)}`} onClick={() => handleTypeFilterClick('처리 장치')}>처리 장치</button>
        <button className={`mr-2 p-2 ${getButtonClass(null, selectedType)}`} onClick={() => handleTypeFilterClick(null)}>전체</button>
      </div>
      <div className="mt-2 ml-6 text-lg">증가 능력치</div>     
      <div className="flex mt-2 ml-6">
        <button className={`mr-2 p-2 ${getButtonClass('105000001', selectedStat)}`} onClick={() => handleStatFilterClick('105000001')}>최대 체력</button>
        <button className={`mr-2 p-2 ${getButtonClass('105000025', selectedStat)}`} onClick={() => handleStatFilterClick('105000025')}>최대 실드</button>
        <button className={`mr-2 p-2 ${getButtonClass('105000029', selectedStat)}`} onClick={() => handleStatFilterClick('105000029')}>방어력</button>
        <button className={`mr-2 p-2 ${getButtonClass(null, selectedStat)}`} onClick={() => handleStatFilterClick(null)}>전체</button>
      </div>
      <div className="mt-2 ml-6 text-lg">등급</div>    
      <div className="flex mt-2 ml-6">
        <button className={`mr-2 p-2 ${getButtonClass('일반', selectedTier)}`} onClick={() => handleTierFilterClick('일반')}>일반</button>
        <button className={`mr-2 p-2 ${getButtonClass('희귀', selectedTier)}`} onClick={() => handleTierFilterClick('희귀')}>희귀</button>
        <button className={`mr-2 p-2 ${getButtonClass('궁극', selectedTier)}`} onClick={() => handleTierFilterClick('궁극')}>궁극</button>
        <button className={`mr-2 p-2 ${getButtonClass(null, selectedTier)}`} onClick={() => handleTierFilterClick(null)}>전체</button>
      </div>
      <div className="mt-2 ml-6 text-lg">세트 효과</div>    
      <div className="flex flex-wrap mt-2 ml-6">
        {
        ['무덤 선봉대', '초신성', '전투의 미학', '절멸', '처형인', '학살자', '혹한', '극야', '맹독의 정수', '숙련 사수', '늪 정찰대', '얼어붙은 심장', '곡예사', '활화산', '굶주린 음파', '전체'].map((data, idx) => {
          return (
            data !== "전체" ?
            <button className={`mr-2 mb-2 p-2 ${getButtonClass(data, selectedSetOption)}`} onClick={() => handleSetOptionFilterClick(data)}>{data}</button>
          :  <button className={`mr-2 mb-2 p-2 ${getButtonClass(null, selectedSetOption)}`} onClick={() => handleSetOptionFilterClick(null)}>{data}</button>
          )
        })
        }
      </div>
     
      <div className="flex items-center mt-6 ml-6 text-center">
        <div className="w-44">부품</div>
        <div className="w-28">등급</div>
        <div className="w-40">증가 능력치</div>
        <div className="w-28">2세트 옵션</div>
        <div className="w-60">4세트 옵션</div>
      </div>
      
        {
          filterData.map((data, idx) => {
            return (
              <div className="flex mt-6 ml-6 items-center">
                <div className="flex flex-col items-center w-44">
                  <img className="h-20 w-20 object-cover" src={data.image_url} />
                  <div>{data.external_component_name}</div>
                </div>
                <div className="w-28 text-center">
                  {data.external_component_tier} 등급
                </div>
                <div className="w-40 text-center">
                  {getStatName(data.base_stat[0].stat_id)}
                </div>
                {data.set_option_detail.length !== 0 ?
                  <>
                    {
                      data.set_option_detail.map((setData, idx) => {
                        return (
                        <div className={`${idx === 0 ? 'w-28' : 'w-60 text-sm'} text-center`}>{setData.set_option} <br /> {setData.set_option_effect}</div>
                        )
                      })
                    }
                  </>
                  : 
                  <>
                    <div className="w-28 text-center">세트 효과 없음</div>
                    <div className="w-60 text-center">세트 효과 없음</div>
                  </>
                  }
        
                
              </div>
            )
          })
        }
      </div>

  )
}
