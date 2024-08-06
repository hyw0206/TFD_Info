// Type import
import { Component } from "@/src/data/type/component";
import { Stat } from "@/src/data/type/stat";

// Hook import
import { useState } from "react";

// data import
const datas: Component[] = require("@/src/data/json/component.json");
const stats: Stat[] = require("@/src/data/json/stat.json");

export default function ComponentLayoutPage() {

  // useState Hook Setting

  // 선택된 부품 타입
  const [selectedType, setSelectedType] = useState<string | null>(null);
  // 선택된 스탯
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  // 선택된 등급
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  // 선택된 세트 옵션
  const [selectedSetOption, setSelectedSetOption] = useState<string | null>(null);

  // 일반 함수

  // 스탯 id -> 스탯 이름
  const getStatName = (id: string): string => {
    const result = stats?.find((stat) => stat.stat_id === id)
    return result ? result.stat_name : 'error'
  }

  // 바인딩 함수

  // 부품 타입 필터링
  const handleTypeFilterClick  = (type: string | null) => {
    if (selectedType == type) return;
    setSelectedType(type);
  }
  // 증가 스탯 필터링
  const handleStatFilterClick = (stat: string | null) => {
    if (selectedStat == stat) return;
    setSelectedStat(stat);
  }
  // 등급 필터링
  const handleTierFilterClick = (tier: string | null) => {
    if (selectedTier == tier) return;
    setSelectedTier(tier);
  }
  // 세트 옵션 필터링
  const handleSetOptionFilterClick = (setOption: string | null) => {
    if (selectedSetOption == setOption) return;
    setSelectedSetOption(setOption);
  }

  // 데이터 필터 함수

  // 현재 선택된 버튼의 데이터만 보여짐
  const filterData = datas.filter((data) => {
    const typeMatch = selectedType ? data.external_component_equipment_type === selectedType : true;
    const statMatch = selectedStat ? data.base_stat[0].stat_id === selectedStat : true;
    const tierMatch = selectedTier ? data.external_component_tier === selectedTier : true;
    const setOptionMatch = selectedSetOption ? data.set_option_detail[0]?.set_option === selectedSetOption : true;
    return typeMatch && statMatch && tierMatch && setOptionMatch;
  });

  // 스타일링 함수

  // 현재 선택된 버튼 스타일링
  const getButtonClass = (type: string | null, current: string | null) => {
    return type === current ? "rounded bg-blue-500 text-white " : "rounded bg-gray-500 text-white";
  }


  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 text-2xl font-bold">외장 부품 정보</div>
      <div className="mt-4 ml-6 text-lg">부품 종류</div>      
      <div className="flex flex-wrap mt-2 ml-6">
        {
          ['전체', '보조 전원', '센서', '메모리', '처리 장치'].map((data, idx) => {
            return (
              data !== "전체" ?
              <button key={data + "부품" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(data, selectedType)}`} onClick={() => handleTypeFilterClick(data)}>{data}</button>
            :  <button key={data + "부품" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(null, selectedType)}`} onClick={() => handleTypeFilterClick(null)}>{data}</button>
            )
          })
        }
      </div>
      <div className="mt-2 ml-6 text-lg">증가 능력치</div>     
      <div className="flex flex-wrap mt-2 ml-6">
        <button className={`mr-2 mb-2 p-2 ${getButtonClass(null, selectedStat)}`} onClick={() => handleStatFilterClick(null)}>전체</button>
        <button className={`mr-2 mb-2 p-2 ${getButtonClass('105000001', selectedStat)}`} onClick={() => handleStatFilterClick('105000001')}>최대 체력</button>
        <button className={`mr-2 mb-2 p-2 ${getButtonClass('105000025', selectedStat)}`} onClick={() => handleStatFilterClick('105000025')}>최대 실드</button>
        <button className={`mr-2 mb-2 p-2 ${getButtonClass('105000029', selectedStat)}`} onClick={() => handleStatFilterClick('105000029')}>방어력</button>
      </div>
      <div className="mt-2 ml-6 text-lg">등급</div>    
      <div className="flex flex-wrap mt-2 ml-6">
        {
          ['전체', '일반', '희귀', '궁극'].map((data, idx) => {
            return (
              data !== "전체" ?
              <button key={data + "등급" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(data, selectedTier)}`} onClick={() => handleTierFilterClick(data)}>{data}</button>
            :  <button key={data + "등급" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(null, selectedTier)}`} onClick={() => handleTierFilterClick(null)}>{data}</button>
            )
          })
        }
      </div>
      <div className="mt-2 ml-6 text-lg">세트 효과</div>    
      <div className="flex flex-wrap mt-2 ml-6">
        {
        ['전체', '무덤 선봉대', '초신성', '전투의 미학', '절멸', '처형인', '학살자', '혹한', '극야', '맹독의 정수', '숙련 사수', '늪 정찰대', '얼어붙은 심장', '곡예사', '활화산', '굶주린 음파'].map((data, idx) => {
          return (
            data !== "전체" ?
            <button key={data + "세트" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(data, selectedSetOption)}`} onClick={() => handleSetOptionFilterClick(data)}>{data}</button>
          :  <button key={data + "세트" + idx} className={`mr-2 mb-2 p-2 ${getButtonClass(null, selectedSetOption)}`} onClick={() => handleSetOptionFilterClick(null)}>{data}</button>
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
              // 필터링된 데이터 보여주기
              <div className="flex mt-6 ml-6 items-center text-sm fix:text-base" key={data.image_url + idx}>
                <div className="flex flex-col items-center w-44">
                  <img className="w-12 h-12 object-cover fix:w-20 fix:h-20" src={data.image_url} />
                  <div>{data.external_component_name}</div>
                </div>
                <div className="w-28 text-center">
                  {data.external_component_tier} 등급
                </div>
                <div className="w-40 text-center">
                  {getStatName(data.base_stat[0].stat_id)}
                </div>
                {data.set_option_detail.length !== 0 ?
                // 불러올 세트 옵션 데이터가 있을 때
                  <>
                    {
                      data.set_option_detail.map((setData, idx) => {
                        return (
                        <div className={`${idx === 0 ? 'w-28' : 'w-60 text-sm'} text-center`} key={setData.set_option + idx}>{setData.set_option} <br /> {setData.set_option_effect}</div>
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