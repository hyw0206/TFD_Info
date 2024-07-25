import { CaretDownOutlined } from "@ant-design/icons";
import { RewardData } from "@/src/data/type/reward";
import { useState, useMemo } from "react";

export default function RewardLayoutPage() {
  const [visibleBattleZones, setVisibleBattleZones] = useState({});
  const [visibleRewards, setVisibleRewards] = useState({});

  const [selectedRewardType, setSelectedRewardType] = useState<string | null>(null);
  const [selectedReactorElementType, setSelectedReactorElementType] = useState<string | null>(null);
  const [selectedWeaponRoundsType, setSelectedWeaponRoundsType] = useState<string | null>(null);
  const [selectedArcheType, setSelectedArcheType] = useState<string | null>(null);

  const datas: RewardData[] = require("@/src/data/json/reward.json");

  const toggleVisibility = (mapIdx) => {
    setVisibleBattleZones(prevState => {
      const newState = { ...prevState, [mapIdx]: !prevState[mapIdx] };
      if (!newState[mapIdx]) {
        setVisibleRewards(prevState => {
          const newRewardsState = { ...prevState };
          Object.keys(newRewardsState)
            .filter(key => key.startsWith(mapIdx.toString()))
            .forEach(key => delete newRewardsState[key]);
          return newRewardsState;
        });
      }
      return newState;
    });
  };

  const toggleVisibilityReward = (mapIdx, battleIdx) => {
    const key = `${mapIdx}-${battleIdx}`;
    setVisibleRewards(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleRewardTypeFilterClick = (type: string | null) => {
    if (selectedRewardType === type) return;
    setSelectedRewardType(type);
  };

  const handleReactorElementTypeFilterClick = (type: string | null) => {
    if (selectedReactorElementType === type) return;
    setSelectedReactorElementType(type);
  };

  const handleWeaponRoundsTypeFilterClick = (type: string | null) => {
    if (selectedWeaponRoundsType === type) return;
    setSelectedWeaponRoundsType(type);
  };

  const handleArcheTypeFilterClick = (type: string | null) => {
    if (selectedArcheType === type) return;
    setSelectedArcheType(type);
  };

  const filterData = useMemo(() => datas.filter(reward =>
    reward.battle_zone.length !== 0
  ).map(data => ({
    ...data,
    battle_zone: data.battle_zone.map(battle => ({
      ...battle,
      reward: battle.reward.filter(reward => {
        const rewardTypeMatch = selectedRewardType ? reward.reward_type === selectedRewardType : true;
        const reactorElementTypeMatch = selectedReactorElementType ? reward.reactor_element_type === selectedReactorElementType : true;
        const weaponRoundsTypeMatch = selectedWeaponRoundsType ? reward.weapon_rounds_type === selectedWeaponRoundsType : true;
        const archeTypeMatch = selectedArcheType ? reward.arche_type === selectedArcheType : true;
        return rewardTypeMatch && reactorElementTypeMatch && weaponRoundsTypeMatch && archeTypeMatch;
      })
    }))
  })), [selectedRewardType, selectedReactorElementType, selectedWeaponRoundsType, selectedArcheType, datas]);

  const getButtonClass = (type: string | null, current: string | null) => {
    return type === current ? "bg-blue-500 text-white" : "bg-gray-500 text-white";
  };

  const formatRotations = (rotations) => {
    if (rotations.length === 0) return "없음";

    // 중복 제거 및 정렬
    const uniqueSortedRotations = Array.from(new Set(rotations)).sort((a, b) => a - b);

    let ranges = [];
    let rangeStart = uniqueSortedRotations[0];
    let rangeEnd = uniqueSortedRotations[0];

    for (let i = 1; i < uniqueSortedRotations.length; i++) {
      if (uniqueSortedRotations[i] === rangeEnd + 1) {
        rangeEnd = uniqueSortedRotations[i];
      } else {
        ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
        rangeStart = uniqueSortedRotations[i];
        rangeEnd = uniqueSortedRotations[i];
      }
    }

    ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
    return ranges.join(", ");
  };

  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 text-2xl font-bold">난이도 보상 정보</div>
      <div className="mb-4 ml-6 text-sm">난이도 보상 정보는 총 20개의 로테이션로 나뉩니다. 숫자는 로테이션 숫자를 나타냅니다.</div>
      <div className="mb-4 ml-6 text-3xl">현재 로테이션 : 6 (다음 로테이션 : 7월 30일 오후 4시, 7)</div>
     
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">보상 타입</div>
        <button
          className={`mr-2 p-2 rounded ${getButtonClass(selectedRewardType, null)}`}
          onClick={() => handleRewardTypeFilterClick(null)}
        >
          전체
        </button>
        {["반응로", "보조 전원", "센서", "메모리", "처리 장치"].map(type => (
          <button
            key={type}
            className={`mr-2 p-2 rounded ${getButtonClass(selectedRewardType, type)}`}
            onClick={() => handleRewardTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">속성</div>
        <button
          className={`mr-2 p-2 rounded ${getButtonClass(selectedReactorElementType, null)}`}
          onClick={() => handleReactorElementTypeFilterClick(null)}
        >
          전체
        </button>
        {["전기", "화염", "냉기", "독성", "무 속성"].map(type => (
          <button
            key={type}
            className={`mr-2 p-2 rounded ${getButtonClass(selectedReactorElementType, type)}`}
            onClick={() => handleReactorElementTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">무기 탄</div>
        <button
          className={`mr-2 p-2 rounded ${getButtonClass(selectedWeaponRoundsType, null)}`}
          onClick={() => handleWeaponRoundsTypeFilterClick(null)}
        >
          전체
        </button>
        {["일반탄", "특수탄", "충격탄", "고위력탄"].map(type => (
          <button
            key={type}
            className={`mr-2 p-2 rounded ${getButtonClass(selectedWeaponRoundsType, type)}`}
            onClick={() => handleWeaponRoundsTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">타입</div>
        <button
          className={`mr-2 p-2 rounded ${getButtonClass(selectedArcheType, null)}`}
          onClick={() => handleArcheTypeFilterClick(null)}
        >
          전체
        </button>
        {["차원", "공학", "융합", "특이"].map(type => (
          <button
            key={type}
            className={`mr-2 p-2 rounded ${getButtonClass(selectedArcheType, type)}`}
            onClick={() => handleArcheTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {filterData.map((data, mapIdx) => {
        const battleZoneInfo = data.battle_zone.map(battle => {
          const rewards = battle.reward;
          const rotations = rewards.map(reward => reward.rotation);
          return { rotations };
        });

        // 모든 로테이션 번호를 수집
        const allRotations = battleZoneInfo.flatMap(info => info.rotations);
        const uniqueSortedRotations = Array.from(new Set(allRotations)).sort((a, b) => a - b);
        const rotationRanges = formatRotations(uniqueSortedRotations);

        // 필터된 보상의 개수
        const totalFilteredRewardsCount = battleZoneInfo.flatMap(info => info.rotations).length;

        return (
          <div key={mapIdx} className="mt-4">
            <div
              className="p-2 bg-gray-300 cursor-pointer"
              onClick={() => toggleVisibility(mapIdx)}
            >
              {data.map_name} (선택한 옵션 {totalFilteredRewardsCount}개 존재) / (로테이션 {rotationRanges} 존재)
              <CaretDownOutlined className={`ml-2 transition-transform ${visibleBattleZones[mapIdx] ? 'rotate-180' : ''}`} />
            </div>
            <div className={`${visibleBattleZones[mapIdx] ? '' : 'hidden'}`}>
              {data.battle_zone.map((battle, battleIdx) => {
                const rewards = battle.reward;
                const rotations = rewards.map(reward => reward.rotation);
                const filteredRewardsCount = rewards.length;
                return (
                  <div key={battleIdx} className="ml-4">
                    <div
                      className="p-2 bg-gray-200 cursor-pointer"
                      onClick={() => toggleVisibilityReward(mapIdx, battleIdx)}
                    >
                      {battle.battle_zone_name} (선택한 옵션 {filteredRewardsCount}개 존재) / (로테이션 {formatRotations(rotations)} 존재)
                      <CaretDownOutlined className={`ml-2 transition-transform ${visibleRewards[`${mapIdx}-${battleIdx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`${visibleRewards[`${mapIdx}-${battleIdx}`] ? '' : 'hidden'}`}>
                      {rewards.map((reward, rewardIdx) => (
                        <div key={rewardIdx} className="ml-4 p-2 bg-gray-100">
                          <div>로테이션: {reward.rotation}</div>
                          <div>보상 타입: {reward.reward_type}</div>
                          {reward.reactor_element_type && <div>속성: {reward.reactor_element_type}</div>}
                          {reward.weapon_rounds_type && <div>무기 탄: {reward.weapon_rounds_type}</div>}
                          {reward.arche_type && <div>타입: {reward.arche_type}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
