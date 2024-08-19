// type import
import { Module, ModuleBuilder } from "@/src/data/type/module";
import { Weapon } from "@/src/data/type/weapon_type";
import { Descendant } from "@/src/data/type/descendant_type";

// Hook import
import { useState, useRef } from "react";

// antd import
import { Select, Space, Tooltip, notification } from "antd";
import type { NotificationArgsProps } from 'antd';


// type declare
type NotificationPlacement = NotificationArgsProps['placement'];

// data import
const weaponData: Weapon[] = require("@/src/data/json/weapon.json");
const descendantData: Descendant[] = require("@/src/data/json/descendant.json");
const moduleData: Module[] = require("@/src/data/json/module.json");

export default function DescendantBuilderLayout() {
  
  // useState Hook Setting

  // 1~10번째 슬롯 중 선택된 슬롯
  const [slot, setSlot] = useState<number>(0);

  // 계승자 종류
  const [descendant, setDescendant] = useState<number | null>(null);

  // 모듈 수용량
  const [capacity, setCapacity] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  // 무기 선택 창 표시 여부
  const [showDescendantSelector, setShowDescendantSelector] = useState<boolean>(false);

  // 1~10번째 슬롯에 들어간 모듈
  const [activeModules, setActiveModules] = useState<(ModuleBuilder | null)[]>([null, null, null, null, null, null, null, null, null, null]);
  
  // 1~10번째 슬롯의 모듈 소켓 타입
  const [socket, setSocket] = useState<(string | null)[]>([null, null, null, null, null, null, null, null, null, null]);
  

  // useRef Hook Setting
  
  // 무기 선택 부분
  const descendantSelectorRef = useRef<HTMLDivElement>(null);
  
  // antd Setting

  // Notification 보여줄 부분
  const [api, contextHolder] = notification.useNotification();


  // 일반 변수

  // 슬롯의 Select 항목에 들어갈 내용
  const options = [
    { value: null, label: '소켓 선택' },
    { value: 'Almandine', label: '알만딘' },
    { value: 'Cerulean', label: '세룰리안' },
    { value: 'Malachite', label: '말라카이트' },
    { value: 'Rutile', label: '루틸' },
    { value: 'Xantic', label: '크산틱' },
  ];

  // 일반 함수

  // 티어에 따라 백그라운드 색 클래스 반환
  const setClassWithTierBg = (data: string) => {
    if (data === "일반") return "grade1" 
    if (data === "희귀") return "grade2" 
    if (data === "궁극") return "grade3" 
    if (data === "초월") return "grade4" 
    return "";
  }

  // 소켓 타입에 따른 이미지 파일 이름 반환
  const setClassWithSocket = (data: string) => {
    if (data === "말라카이트") return "Malachite"
    if (data === "크산틱") return "Xantic"
    if (data === "루틸") return "Rutile"
    if (data === "알만딘") return "Almandine"
    if (data === "세룰리안") return "Cerulean"
    return ""
  }

  // 같은 이름 모듈 알림
  const openNotificationSameModule = (placement: NotificationPlacement) => {
    api.info({
      message: `같은 모듈 감지`,
      description:
        '이미 동일한 모듈을 장착 중입니다.',
      placement,
    });
  };

  // 같은 타입 모듈 알림
  const openNotificationSameType = (placement: NotificationPlacement) => {
    api.info({
      message: `같은 모듈 타입 감지`,
      description:
        '이미 동일한 타입의 모듈을 장착 중입니다.',
      placement,
    }); 
  };


  // bindind Func

  // 무기 선택 창 여는 경우
  const handleDescendantClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDescendantSelector(true);
    document.addEventListener("click", handleOutsideClick);
  };

  // 무기 선택 창 밖을 클릭해서 닫히는 경우
  const handleOutsideClick = (event: MouseEvent) => {
    if (descendantSelectorRef.current && !descendantSelectorRef.current.contains(event.target as Node)) {
      setShowDescendantSelector(false);
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  // 무기를 선택한 경우
  const handleSetDescendantClick = (weaponNum: number) => {
    if (descendant === weaponNum) return;
    setDescendant(weaponNum);
  }

  // 모듈을 클릭해서, 슬롯에 들어가는 경우
  const handleModuleClick = (module: Module) => {

    // 모듈 소켓 타입 변수
    let socketmatch = false;
    
    // 이미 이름이 같은 모듈이 있는 경우
    if (activeModules.find((item) => item?.module_name === module.module_name)) {
      openNotificationSameModule('top');
      return;
    }

    // 이미 타입이 같은 모듈이 있는 경우 (뒤 조건문 : 같은 슬롯 제외)
    if ((module.module_type !== null) && (activeModules.find((item) => item?.module_type === module.module_type)) && (!(activeModules.findIndex(item => item?.module_type === module.module_type) === slot))) {
      openNotificationSameType('top');
      return;
    }

    // 선택한 슬롯의 소켓 타입이 모듈의 소켓 타입과 같은 경우
    if (socket[slot] === module.module_socket_type) {
      socketmatch = true;
    }

    // 선택한 슬롯에 모듈을 넣기 위한 작업
    const newActiveModules = [...activeModules];

    // 선택한 슬롯에 현재 모듈 삽입
    newActiveModules[slot] = {...module, levelnow: module.module_stat.length - 1, socketmatch: socketmatch};

    // 소켓 타입이 같다면, 수용량 / 2 를 올림한 값을 넣는다
    if (socketmatch) capacity[slot] = Math.ceil(module.module_stat[module.module_stat.length - 1].module_capacity / 2)
    else {
      // 소켓 타입이 선택 되지 않은 경우 그대로
      if (socket[slot] === null || socket[slot] === "소켓 선택") capacity[slot] = module.module_stat[module.module_stat.length - 1].module_capacity;
      
      // 소켓 타입이 선택 된 경우 + 5
      else capacity[slot] = module.module_stat[module.module_stat.length - 1].module_capacity + 5;
    }
    
    // 가공한 값 삽입
    setActiveModules(newActiveModules);
  }

  // 레벨을 올리거나 내릴 때
  const onClickLevelnow = (idx: number) => {

    // 모듈 수용량 가져오기
    const capacitys = activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].module_capacity;

    // 소켓 타입이 같다면 ~~ 
    if (activeModules[idx]!.socketmatch) {
      capacity[idx] = Math.ceil((capacitys) / 2)
    } else {
      // 다르면서 선택 되지 않은 경우
      if (socket[idx] === null || socket[idx] === "소켓 선택") {
        capacity[idx] = capacitys;
      } else {
        capacity[idx] = capacitys + 5;
      }
    }
    setActiveModules([...activeModules]);
  }

  // 데이터 필터링 함수
  const checkDescendantMatch = (module: Module) => {
    if (descendant !== null) {
      return module.module_class === "계승자" && (
        Number(module.module_id) < 254001001 ||
        (
          (Number(module.module_id) >= 254001001 && Number(module.module_id) <= 254001004) &&
          (descendantData[descendant].descendant_name === "레픽" || descendantData[descendant].descendant_name === "얼티밋 레픽") ||
          (Number(module.module_id) >= 254002001 && Number(module.module_id) <= 254002004) &&
          (descendantData[descendant].descendant_name === "에이잭스" || descendantData[descendant].descendant_name === "얼티밋 에이잭스") ||
          (Number(module.module_id) >= 254003001 && Number(module.module_id) <= 254003004) &&
          (descendantData[descendant].descendant_name === "비에사" || descendantData[descendant].descendant_name === "얼티밋 비에사") ||
          (Number(module.module_id) >= 254004001 && Number(module.module_id) <= 254004002) &&
          (descendantData[descendant].descendant_name === "얼티밋 레픽") ||
          (Number(module.module_id) >= 254005001 && Number(module.module_id) <= 254005004) &&
          (descendantData[descendant].descendant_name === "제이버") ||
          (Number(module.module_id) >= 254006001 && Number(module.module_id) <= 254006004) &&
          (descendantData[descendant].descendant_name === "버니" || descendantData[descendant].descendant_name === "얼티밋 버니") ||
          (Number(module.module_id) >= 254007001 && Number(module.module_id) <= 254007002) &&
          (descendantData[descendant].descendant_name === "얼티밋 에이잭스") ||
          (Number(module.module_id) >= 254008001 && Number(module.module_id) <= 254008004) &&
          (descendantData[descendant].descendant_name === "프레이나") ||
          (Number(module.module_id) >= 254009001 && Number(module.module_id) <= 254009004) &&
          (descendantData[descendant].descendant_name === "글레이" || descendantData[descendant].descendant_name === "얼티밋 글레이") ||
          (Number(module.module_id) >= 254009005 && Number(module.module_id) <= 254009006) &&
          descendantData[descendant].descendant_name === "얼티밋 글레이" ||
          (Number(module.module_id) >= 254010001 && Number(module.module_id) <= 254010002) &&
          (descendantData[descendant].descendant_name === "얼티밋 비에사") ||
          (Number(module.module_id) >= 254011001 && Number(module.module_id) <= 254011004) &&
          (descendantData[descendant].descendant_name === "샤렌") ||
          (Number(module.module_id) >= 254012001 && Number(module.module_id) <= 254012004) &&
          (descendantData[descendant].descendant_name === "루나") ||
          (Number(module.module_id) >= 254013001 && Number(module.module_id) <= 254013004) &&
          (descendantData[descendant].descendant_name === "밸비" || descendantData[descendant].descendant_name === "얼티밋 밸비") ||
          (Number(module.module_id) >= 254013005 && Number(module.module_id) <= 254013006) &&
          (descendantData[descendant].descendant_name === "얼티밋 밸비") ||
          (Number(module.module_id) >= 254014001 && Number(module.module_id) <= 254014004) &&
          (descendantData[descendant].descendant_name === "카일") ||
          (Number(module.module_id) >= 254015001 && Number(module.module_id) <= 254015004) &&
          (descendantData[descendant].descendant_name === "에시모") ||
          (Number(module.module_id) >= 254016001 && Number(module.module_id) <= 254016004) &&
          (descendantData[descendant].descendant_name === "엔조") ||
          (Number(module.module_id) >= 254017001 && Number(module.module_id) <= 254017004) &&
          (descendantData[descendant].descendant_name === "유진") ||
          (Number(module.module_id) >= 254018001 && Number(module.module_id) <= 254018004) &&
          (descendantData[descendant].descendant_name === "블레어") ||
          (Number(module.module_id) >= 254019001 && Number(module.module_id) <= 254019002) &&
          (descendantData[descendant].descendant_name === "얼티밋 버니")
        )
      )
    }
  }
  return (
    <div className="max-w-5xl m-auto p-4">
      {
        // contextHolder : Notification 창이 뜨는 곳 지정
      }
      {contextHolder}
      <div className="flex">
        <div className="relative">
          {
            descendant !== null ?
            (
              <>
                <div className="w-60">
                  <div>
                    <div className={`text-xl font-bold`}>{descendantData[descendant].descendant_name}</div>
                  </div>
                </div>
                <img 
                  className="w-40 h-40 border-2 border-dashed"
                  src={descendantData[descendant].descendant_image_url} 
                  onClick={handleDescendantClick}
                />
              </>
            ) : (
              <>
                <div className="text-2xl">-</div>
                <div 
                  className="flex justify-center items-center w-60 h-60 border-2 border-dashed text-center"
                  onClick={handleDescendantClick}
                >
                  <div>계승자 선택</div>
                </div>
              </>
            )
          }
          <div>수용량 : {capacity.reduce((sum, num) => sum + num, 0)} / 85</div>
          <div className="mt-4 text-xl font-bold">증가 능력치</div>
          {
            activeModules.map((item, idx) => {
              if (item === null) return;
              return (
                <div className="max-w-60 text-sm">{item.module_stat[item.levelnow].value}</div>
              )
              
            })
          }
          {showDescendantSelector && (
            <div
              ref={descendantSelectorRef}
              className="absolute left-10p flex flex-col justify-center w-[930px] p-4 font-bold color-white bg-navy z-10 rounded"
            >
              <div className="w-5xl text-center text-2xl">계승자 선택</div>
              <hr className="mt-4 mb-4" />
              <div className="flex flex-row justify-between flex-wrap p-2 max-h-80 overflow-auto">
                {descendantData?.map((data, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col justify-center items-center w-44 mb-2 rounded`}
                    onClick={() => {
                      setShowDescendantSelector(false);
                      document.removeEventListener("click", handleOutsideClick);
                      handleSetDescendantClick(idx)
                    }}
                  >
                    <img className="w-40 h-40 p-0.5" src={data.descendant_image_url} alt={data.descendant_name} />
                    <div>{data.descendant_name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        <div>
          <div className="flex flex-wrap w-full">
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => {
                return (
                  <Tooltip title={
                    activeModules[idx] !== null ?
                    <div className="w-60 p-2">
                      {activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].value}
                    </div>
                    : ""
                  }
                >
                  <div 
                    className={`flex flex-col justify-around items-center w-[135px] h-40 m-[1%] bg-gray-200 dark:bg-darkhf box-border rounded cursor-pointer ${slot === item ? "border-2 border-black dark:border-white" : ""}`}
                    onClick={() => {
                      setSlot(idx)
                    }}  
                    >
                    <div className="relative flex flex-row w-[100%] h-[100%]">
                      <div className="relative flex flex-col justify-end items-center h-[100%]">
                        {
                          activeModules[idx] != null && (
                            <>
                              <div 
                                className="absolute text-xl top-0 left-0"
                                onClick={() => {
                                  activeModules[idx] = null;
                                  capacity[idx] = 0;
                                  setActiveModules([...activeModules]);
                                }}
                              >
                                Ｘ
                              </div>
                              <div 
                                className="absolute top-2 left-8 text-2xl text-green-500"
                                onClick={() => {
                                  if (activeModules[idx]!.levelnow + 1 < activeModules[idx]!.module_stat.length) {
                                    activeModules[idx]!.levelnow += 1;
                                    onClickLevelnow(idx);
                                  }
                                }}
                              >＋</div>
                              <div 
                                className="absolute top-12 left-8 text-2xl text-red-500"
                                onClick={() => {
                                  if (activeModules[idx]!.levelnow > 0) {
                                    activeModules[idx]!.levelnow -= 1;
                                    onClickLevelnow(idx);
                                  }
                                }}
                              >－</div>
                            </>
                          )
                        }
                        {  
                          activeModules[idx] !== null && (
                          [...Array(activeModules[idx].module_stat.length - 1)].map((_, idx2) => {
                            return (
                              <div className={`w-6 h-2 bg-darkdd mb-0.5 rounded ${activeModules[idx]!.module_stat.length - activeModules[idx]!.levelnow - 1 <= idx2 && "bg-yellow"}`}>

                              </div>
                            )
                          })
                        )
                        }
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <img src={activeModules[idx] ? activeModules[idx].image_url : "/chipset.png"} className="w-[60%]" />
                        {
                          activeModules[idx] !== null && (
                            <>
                              <div className="absolute flex bottom-28 w-12 p-0.5 text-center module_area">
                                <div className={`mr-0.5 w-6 h-6 ${setClassWithSocket(activeModules[idx].module_socket_type)}`}></div>
                                  {
                                    
                                    activeModules[idx].socketmatch ?
                                    <div className="text-green-500">
                                      {Math.ceil(activeModules[idx]?.module_stat[activeModules[idx]?.levelnow].module_capacity / 2)}
                                    </div>
                                    :
                                    socket[idx] === null || socket[idx] === "소켓 선택" ?
                                    <div>
                                      {activeModules[idx]?.module_stat[activeModules[idx]?.levelnow].module_capacity}
                                    </div>
                                    :
                                    <div className="text-red-500">
                                      {activeModules[idx]?.module_stat[activeModules[idx]?.levelnow].module_capacity + 5}
                                    </div>
                                  }
                                </div>
                              <div className="text-sm">{activeModules[idx].module_name}</div>
                              <div className="text-sm">{activeModules[idx].module_type ? activeModules[idx].module_type : "-"}</div>
                            </>
                          )
                        }
                      </div>
                    </div>

                    <Space wrap>
                      <Select
                        defaultValue="Empty"
                        style={{ width: "130px"}}
                        options={options}
                        onChange={(value) => {
                          const selectedOption = options.find(option => option.value === value);
                          const label = selectedOption ? selectedOption.label : null;
                          const newSocket = [...socket];
                          newSocket[idx] = label;
                          if (activeModules[idx] !== null) {
                            const capacitys = activeModules[idx].module_stat[activeModules[idx].levelnow].module_capacity;
                            if (newSocket[idx] === activeModules[idx].module_socket_type) {
                              activeModules[idx].socketmatch = true;
                              capacity[idx] = Math.ceil(capacitys / 2)
                            } else if (activeModules[idx] !== null && (newSocket[idx] !== activeModules[idx].module_socket_type))  {
                              activeModules[idx].socketmatch = false;
                              if (label === "소켓 선택" || label === null) {
                                capacity[idx] = capacitys
                              } else {
                                capacity[idx] = capacitys + 5
                              }
                            }
                          }
                          setSocket(newSocket);
                        }}
                      />
                    </Space>
                  </div>
                </Tooltip>
                )
              })
            }
          </div>
          <hr className="mt-2 mb-4 border-t-2 border-black dark:border-white"/>
          <div className="flex flex-wrap max-h-96 pt-4 overflow-y-scroll">
            {
              descendant !== null &&
              (
                moduleData.filter(module =>
                  slot === 0 ?
                  Number(module.module_id) >= 254001001 &&
                  checkDescendantMatch(module) :
                  slot === 5 ?
                  Number(module.module_id) >= 253001001 &&
                  Number(module.module_id) < 254000000 &&
                  checkDescendantMatch(module) :
                  Number(module.module_id) < 253000000 &&
                  checkDescendantMatch(module)
                ).map((module, idx) => {
                  return (
                    <Tooltip title={
                      <div className="flex flex-col w-60 p-2">
                        <div className="flex flex-row items-center justify-between pb-2 border-b font-bold">
                          <div className="text-lg">{module.module_name}</div>
                          <div>{module.module_tier}</div>
                        </div>
                        <div className="flex flex-row pt-2 pb-2">
                          <div><img className="w-20" src={module.image_url} /></div>
                          <div className="ml-4">
                            <div>수용량</div>
                            <div>{module.module_stat[0].module_capacity}~{module.module_stat[module.module_stat.length-1].module_capacity}</div>
                          </div>
                        </div>
                        <div className="flex flex-row pt-1 pb-1 border-y border-gray text-center font-bold">
                          <div className="basis-1/2 border-r">
                            <div>모듈 소켓 타입</div>
                            <div>{module.module_socket_type}</div>
                          </div>
                          <div className="basis-1/2">
                            <div>모듈 클래스</div>
                            <div>{module.module_class}</div> 
                          </div>
                        </div>
                        <div className="flex flex-col pt-2 pb-2 border-b border-gray">
                          <div className="font-bold">최저 레벨 효과</div>
                          <div>{module.module_stat[0].value}</div>
                        </div>
                        <div className="flex flex-col pt-2 pb-2 border-b border-gray">
                          <div className="font-bold">최고 레벨 효과</div>
                          <div>{module.module_stat[module.module_stat.length-1].value}</div>
                        </div>
                      </div>
                    } key={module.image_url + idx}>
                        <div 
                          className="relative w-28 h-28 flex flex-col pb-2 cursor-pointer"
                          onClick={() => {
                              handleModuleClick(module)
                              console.log(activeModules[slot]);
                            }
                          }
                        >
                          <div className="absolute flex bottom-24 left-8 w-12 p-0.5 text-center module_area">
                            <div className={`mr-0.5 w-6 h-6 ${setClassWithSocket(module.module_socket_type)}`}></div>
                            <div>{module.module_stat[0].module_capacity}</div>
                          </div>
                          <img className={`w-16 m-auto ${setClassWithTierBg(module.module_tier)}`} src={module.image_url} />
                          <div className="text-center text-sm">{module.module_name}</div>
                          <div className="text-center text-sm">{module.module_type ? module.module_type : "-"}</div>
                        </div>
                    </Tooltip>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
