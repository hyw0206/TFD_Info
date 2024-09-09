// Type import
import { RewardData } from "@/src/data/type/reward";

// Hook import
import { useState, useMemo, useEffect } from "react";

// antd import
import { CaretDownOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

// data import
const datas: RewardData[] = require("@/src/data/json/reward.json");

// type 선언
type VisibilityState = { [key: number]: boolean };
type RewardVisibilityState = { [key: string]: boolean };

const getCurrentRotationDetails = () => {
  const now = new Date();
  
  // 로테이션 설정
  const rotationDates = [
    { rotation: 8, start: new Date('2024-08-06T16:00:00'), end: new Date('2024-08-13T15:59:59') },
    { rotation: 9, start: new Date('2024-08-13T16:00:00'), end: new Date('2024-08-20T15:59:59') },
    { rotation: 10, start: new Date('2024-08-20T16:00:00'), end: new Date('2024-08-27T15:59:59') },
    { rotation: 11, start: new Date('2024-08-27T16:00:00'), end: new Date('2024-09-03T15:59:59') },
    { rotation: 12, start: new Date('2024-09-03T16:00:00'), end: new Date('2024-09-10T15:59:59') },
    { rotation: 13, start: new Date('2024-09-10T16:00:00'), end: new Date('2024-09-17T15:59:59') },
    { rotation: 14, start: new Date('2024-09-17T16:00:00'), end: new Date('2024-09-24T15:59:59') },
    { rotation: 15, start: new Date('2024-09-24T16:00:00'), end: new Date('2024-10-01T15:59:59') },
    { rotation: 16, start: new Date('2024-10-01T16:00:00'), end: new Date('2024-10-08T15:59:59') },
    { rotation: 17, start: new Date('2024-10-08T16:00:00'), end: new Date('2024-10-15T15:59:59') },
    { rotation: 18, start: new Date('2024-10-15T16:00:00'), end: new Date('2024-10-22T15:59:59') },
    { rotation: 19, start: new Date('2024-10-22T16:00:00'), end: new Date('2024-10-29T15:59:59') },
    { rotation: 20, start: new Date('2024-10-29T16:00:00'), end: new Date('2024-11-05T15:59:59') },

  ];

  // 현재 날짜에 해당하는 로테이션 번호와 날짜 범위 찾기
  for (const rotation of rotationDates) {
    if (now >= rotation.start && now <= rotation.end) {
      return {
        rotationNumber: rotation.rotation,
        startDate: rotation.start.toLocaleDateString(),
        endDate: rotation.end.toLocaleDateString()
      };
    }
  }

  // 현재 로테이션이 없을 경우 기본값 반환
  return {
    rotationNumber: 1,
    startDate: rotationDates[0].start.toLocaleDateString(),
    endDate: rotationDates[0].end.toLocaleDateString()
  };
};

export default function RewardLayoutPage() {
  // useState Hook Setting
  
  // 로테이션별 날짜 체크
  const [rotationDetails, setRotationDetails] = useState(getCurrentRotationDetails());
  // 지역 토글
  const [visibleBattleZones, setVisibleBattleZones] = useState<VisibilityState>({});
  // 세부 지역 토글
  const [visibleRewards, setVisibleRewards] = useState<RewardVisibilityState>({});
  // 보상 타입 필터
  const [selectedRewardType, setSelectedRewardType] = useState<string | null>(null);
  // 속성 필터
  const [selectedReactorElementType, setSelectedReactorElementType] = useState<string | null>(null);
  // 무기 탄 필터
  const [selectedWeaponRoundsType, setSelectedWeaponRoundsType] = useState<string | null>(null);
  // 타입 필터
  const [selectedArcheType, setSelectedArcheType] = useState<string | null>(null);
  // 현재 로테이션만 보기 필터
  const [showCurrentRotationOnly, setShowCurrentRotationOnly] = useState(false); 
  // 일반 함수
  
  // 로테이션 관련 세팅 함수
  const formatRotations = (rotations: string | any[] | Iterable<unknown> | null | undefined) => {
    if (!rotations || (Array.isArray(rotations) && rotations.length === 0)) {
      return "없음";
    }
  
    const arrayOfRotations = Array.isArray(rotations) ? rotations : Array.from(rotations || []);
    
    const uniqueSortedRotations = Array.from(new Set(arrayOfRotations)).sort((a, b) => a - b);
  
    const ranges = [];
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




  // 바인딩 함수

  // 지역 토글
  const toggleVisibility = (mapIdx: number) => {
    setVisibleBattleZones(prevState => {
      // 기존 상태 복사, mapIdx 토글
      const newState = { ...prevState, [mapIdx]: !prevState[mapIdx] };
      // true -> false인 경우
      if (!newState[mapIdx]) {
        setVisibleRewards(prevState => {
          const newRewardsState = { ...prevState };
          // 해당 항목 안에 열려 있는 모든 상태를 닫음
          Object.keys(newRewardsState)
            .filter(key => key.startsWith(mapIdx.toString()))
            .forEach(key => delete newRewardsState[key]);
          return newRewardsState;
        });
      }
      return newState;
    });
  };

  // 세부 지역 토글
  const toggleVisibilityReward = (mapIdx: number, battleIdx: number) => {
    const key = `${mapIdx}-${battleIdx}`;
    // 내부 데이터를 닫거나 / 연다 (세부 지역 토글)
    setVisibleRewards(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  // 보상 타입 필터
  const handleRewardTypeFilterClick = (type: string | null) => {
    if (selectedRewardType === type) return;
    setSelectedRewardType(type);
  };

  // 속성 필터
  const handleReactorElementTypeFilterClick = (type: string | null) => {
    if (selectedReactorElementType === type) return;
    setSelectedReactorElementType(type);
  };
  
  // 무기 탄 필터
  const handleWeaponRoundsTypeFilterClick = (type: string | null) => {
    if (selectedWeaponRoundsType === type) return;
    setSelectedWeaponRoundsType(type);
  };
  
  // 타입 필터
  const handleArcheTypeFilterClick = (type: string | null) => {
    if (selectedArcheType === type) return;
    setSelectedArcheType(type);
  };

  // 데이터 필터 함수

  // useMemo로 의존성 배열 체크
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
        const currentRotationMatch = showCurrentRotationOnly ? reward.rotation === rotationDetails.rotationNumber : true;
        return rewardTypeMatch && reactorElementTypeMatch && weaponRoundsTypeMatch && archeTypeMatch && currentRotationMatch;
      })
    }))
  })), [selectedRewardType, selectedReactorElementType, selectedWeaponRoundsType, selectedArcheType, showCurrentRotationOnly, datas]);

  // 스타일링 함수

  const getButtonClass = (type: string | null, current: string | null) => {
    return type === current ? "bg-blue-500 text-white" : "bg-gray-500 text-white";
  };

  // useEffect Hook Setting

  useEffect(() => {
    const updateRotationDetails = () => {
      setRotationDetails(getCurrentRotationDetails());
    };
    updateRotationDetails();
  }, []);

  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 text-2xl font-bold">난이도 보상 정보</div>
      <div className="mb-4 ml-6 text-sm">난이도 보상 정보는 총 20개의 로테이션로 나뉩니다. 숫자는 로테이션 숫자를 나타냅니다.</div>
      <div className="mb-4 ml-6 text-3xl">현재 로테이션 : {rotationDetails.rotationNumber} ({rotationDetails.startDate} PM 4:00 ~ {rotationDetails.endDate} PM 3:59)</div>
     
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">보상 타입</div>
        <button
          className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedRewardType, null)}`}
          onClick={() => handleRewardTypeFilterClick(null)}
        >
          전체
        </button>
        {["반응로", "보조 전원", "센서", "메모리", "처리 장치"].map(type => (
          <button
            key={type}
            className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedRewardType, type)}`}
            onClick={() => handleRewardTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">속성</div>
        <button
          className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedReactorElementType, null)}`}
          onClick={() => handleReactorElementTypeFilterClick(null)}
        >
          전체
        </button>
        {["전기", "화염", "냉기", "독성", "무 속성"].map(type => (
          <button
            key={type}
            className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedReactorElementType, type)}`}
            onClick={() => handleReactorElementTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">무기 탄</div>
        <button
          className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedWeaponRoundsType, null)}`}
          onClick={() => handleWeaponRoundsTypeFilterClick(null)}
        >
          전체
        </button>
        {["일반탄", "특수탄", "충격탄", "고위력탄"].map(type => (
          <button
            key={type}
            className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedWeaponRoundsType, type)}`}
            onClick={() => handleWeaponRoundsTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6">
        <div className="text-lg mb-2">타입</div>
        <button
          className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedArcheType, null)}`}
          onClick={() => handleArcheTypeFilterClick(null)}
        >
          전체
        </button>
        {["차원", "공학", "융합", "특이"].map(type => (
          <button
            key={type}
            className={`mr-2 mb-2 p-2 rounded ${getButtonClass(selectedArcheType, type)}`}
            onClick={() => handleArcheTypeFilterClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mb-4 ml-6 ">
        <Checkbox
          checked={showCurrentRotationOnly}
          onChange={(e) => setShowCurrentRotationOnly(e.target.checked)}
          className="dark:text-gray-100"
        >
          현재 로테이션만 보기
        </Checkbox>
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
          <div key={mapIdx} className="mt-4 dark:text-gray-100">
            <div
              className="p-2 bg-gray-300 cursor-pointer dark:bg-darkhf"
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
                      className="p-2 bg-gray-200 cursor-pointer dark:bg-darkdw"
                      onClick={() => toggleVisibilityReward(mapIdx, battleIdx)}
                    >
                      {battle.battle_zone_name} (선택한 옵션 {filteredRewardsCount}개 존재) / (로테이션 {formatRotations(rotations)} 존재)
                      <CaretDownOutlined className={`ml-2 transition-transform ${visibleRewards[`${mapIdx}-${battleIdx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`${visibleRewards[`${mapIdx}-${battleIdx}`] ? '' : 'hidden'}`}>
                      {rewards.map((reward, rewardIdx) => (
                        <div key={rewardIdx} className={`ml-4 p-2 bg-gray-100 ${rotationDetails.rotationNumber === reward.rotation && "font-bold"} dark:bg-darkdd`}>
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
