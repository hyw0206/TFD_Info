import { CaretDownOutlined } from "@ant-design/icons";
import { RewardData } from "@/src/data/type/reward";
import { useState } from "react";

export default function RewardLayoutPage() {
  const [visibleBattleZones, setVisibleBattleZones] = useState({});
  const [visibleRewards, setVisibleRewards] = useState({});
  const [visibleFarmingItem, setVisibleFramingItem] = useState({0: false, 1: false});

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

  const toggleVisibilityFarming = (key) => {
    setVisibleFramingItem(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  }

  const datas: RewardData[] = require("@/src/data/json/reward.json");

  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="mt-8 ml-6 text-2xl font-bold">난이도 보상 정보</div>
      <div className="mb-4 ml-6 text-sm">난이도 보상 정보는 총 20개의 로테이션로 나뉩니다. 숫자는 로테이션 숫자를 나타냅니다.</div>
      <div className="mb-4 ml-6 text-3xl">현재 로테이션 : 5 (다음 로테이션 : 7월 23일 오후 4시, 6)</div>
      <div 
        onClick={() => toggleVisibilityFarming(0)} 
        className="mb-4 ml-6 text-xl text-gray-400 cursor-pointer"
      >
        공통 부품 파밍처 확인하기 / 닫기
      </div>
      <div className={`${visibleFarmingItem[0] ? '' : 'hidden'}`}>
        <div className="mb-2 ml-6 text-xl">보조 전원 (1, 3, 5, 7, 8, 10, 12, 14, 16-17, 19)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 집하장 (17) | 유적지 (7)</div>
        <div className="mb-2 ml-10 text-lg">킹스턴 - 보조 전원 (5)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 폐기구역 (10) | 물이끼늪 (19)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 오로라 숲 (3) | 얼어붙은 골짜기 (8), 방어선 (16)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 저장소 (14)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 산령 (1) | 경계구역 (12)</div>

        <div className="mb-2 ml-6 text-xl">센서 (1-2, 4, 6, 8, 12-13, 15, 17)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 잃어버린 보급소 (2)</div>
        <div className="mb-2 ml-10 text-lg">킹스턴 - 무너진 극장 (15)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 폐기구역 (6) | 버려진 은신처 (9)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 고열원체 시설 (13)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 제철소 (12)</div>
        <div className="mb-2 ml-10 text-lg">하기오스 - 조각난 단상 (1)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 담무덤 유역 (4) | 적하기지 (17)</div>

        <div className="mb-2 ml-6 text-xl">메모리 (5, 7, 9, 11, 13, 14, 16, 18, 20)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 유적지 (14)</div>
        <div className="mb-2 ml-10 text-lg">킹스턴 - 몰락지 (20)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 물이끼늪 (11)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 얼어붙은 골짜기 (18)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 저장소 (9)</div>
        <div className="mb-2 ml-10 text-lg">하기오스 - 오염지대 (16) | 전진기지 (7)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 산령 (5) | 경계구역 (13)</div>

        <div className="mb-2 ml-6 text-xl">처리 장치 (2, 4, 6, 9, 11, 13, 15, 18)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 벌목지 (4)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 물이끼늪 (13)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 얼어붙은 골짜기 (6)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 낙석지대 (9) | 제철소 (18)</div>
        <div className="mb-2 ml-10 text-lg">하기오스 - 오염지대 (15)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 달무덤 유역 (11) | 부화실 (2)</div>

      </div>

      <div 
        onClick={() => toggleVisibilityFarming(1)} 
        className="mb-4 ml-6 text-xl text-yellow-400 cursor-pointer"
      >
        버니, 얼티밋 버니 파밍처 확인하기 / 닫기
      </div>
      <div className={`${visibleFarmingItem[1] ? '' : 'hidden'}`}>
        <div className="mb-2 ml-6 text-xl">전기 + 융합 (1-4, 6-20)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 집하장 (12, 14) | 유적지 (12) | 벌목지 (19)</div>
        <div className="mb-2 ml-10 text-lg">킹스턴 - 몰락지 (2, 6, 17)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 안개숲 (6) | 물이끼늪 (8) | 버려진 은신처 (10)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 오로라 숲 (4, 17) | 얼어붙은 골짜기 (19) | 추락한 방주 (15, 20), 고열원체 시설 (8, 11)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 낙석지대 (1) | 저장소 (4, 10, 19) | 통제구역 (13, 17, 18) | 제철소 (4) | 기밀구역 (4)</div>
        <div className="mb-2 ml-10 text-lg">하기오스 - 조각난 단상 (7) | 전진기지 (3, 15) | 별내림길 (15)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 산령 (16) | 달무덤 유역 (9, 12) | 경계구역 (6) | 적하기지 (1, 10, 14) | 부화실 (18)</div>

        <div className="mb-2 ml-6 text-xl">전기 + 특이 (1-20 전체 로테이션)</div>
        <div className="mb-2 ml-10 text-lg">베스퍼스 - 집하장 (20) | 유적지 (9, 10) | 달빛 호수 (18) | 벌목지 (3)</div>
        <div className="mb-2 ml-10 text-lg">킹스턴 - 몰락지 (16) | 무너진 극장 (7, 17) | 대광장 (12, 13)</div>
        <div className="mb-2 ml-10 text-lg">메아리 늪지 - 폐기구역 (8, 13) | 물이끼늪 (15) | 버려진 은신처 (11)</div>
        <div className="mb-2 ml-10 text-lg">요새 - 오로라 숲 (11, 14) | 얼어붙은 골짜기 (14) | 추락한 방주 (5, 8), 고열원체 시설 (16)</div>
        <div className="mb-2 ml-10 text-lg">불모지 - 낙석지대 (17) | 통제구역 (3, 20) | 제철소 (6, 7)</div>
        <div className="mb-2 ml-10 text-lg">하기오스 - 모래 언덕 기지 (12, 15) | 오염지대 (1, 4) | 조각난 단상 (9) | 전진기지 (5, 16)</div>
        <div className="mb-2 ml-10 text-lg">백야 협곡 - 산령 (2, 19) | 달무덤 유역 (10) | 경계구역 (5, 19) | 적하기지 (7)</div>
      </div>

      <div>
        {
          datas?.filter(reward =>
            reward.battle_zone.length !== 0
          ).map((reward, mapIdx) => {
            return (
              <div key={mapIdx} className="flex flex-col w-4xl pt-1.5 pb-1.5 text-2xl text-center text-white area">
                <div className="flex">
                  <div className="grow">{reward.map_name}</div>
                  <CaretDownOutlined
                    onClick={() => toggleVisibility(mapIdx)}
                    className="mr-4 cursor-pointer"
                  />
                </div>
                {
                  reward.battle_zone.map((battle, battleIdx) => {
                    return (
                      <div key={battleIdx}>
                        <div className={`flex pt-1 pb-1.5 text-xl ${visibleBattleZones[mapIdx] ? '' : 'hidden'} area2`}>
                          <div className="grow">{battle.battle_zone_name}</div>
                          <CaretDownOutlined 
                            onClick={() => toggleVisibilityReward(mapIdx, battleIdx)}
                            className="mr-2 cursor-pointer"
                          />
                        </div>
                        <div className={`flex flex-wrap ${visibleRewards[`${mapIdx}-${battleIdx}`] ? '' : 'hidden'}`}>
                          {
                            battle.reward.map((battlereward, rewardIdx) => {
                              return (
                                <div key={rewardIdx} className="basis-1/10 pt-1 pb-1.5 border-2 border-black border-collapse text-xl area2">
                                  <div className="text-sm">로테이션 {rewardIdx+1}</div>
                                  {battlereward.reward_type === "반응로" ?
                                    <>
                                      <div className="font-bold">{battlereward.reward_type}</div>
                                      <div 
                                      className={`
                                        ${((battlereward.reactor_element_type === "전기") && 
                                          (battlereward.arche_type === "특이" || battlereward.arche_type === "융합")) 
                                          ? 'text-yellow-200' : ''
                                      }`}>{battlereward.reactor_element_type}</div>
                                      <div>{battlereward.weapon_rounds_type}</div>
                                      <div 
                                      className={`
                                        ${((battlereward.reactor_element_type === "전기") && 
                                          (battlereward.arche_type === "특이" || battlereward.arche_type === "융합")) 
                                          ? 'text-yellow-200' : ''
                                      }`}>{battlereward.arche_type}</div>
                                    </>
                                    : 
                                    <>
                                      <div>{battlereward.reward_type}</div>
                                      <div>랜덤 옵션</div>
                                    </>
                                  }  

                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
