// type import
import { Module, ModuleBuilder } from "@/src/data/type/module";
import { Weapon } from "@/src/data/type/weapon_type";

// Hook import
import { useState, useRef } from "react";

// antd import
import { Input, Select, Space, Tooltip, notification } from "antd";
import type { NotificationArgsProps } from 'antd';

// type declare
type NotificationPlacement = NotificationArgsProps['placement'];

// data import
const weaponData: Weapon[] = require("@/src/data/json/weapon.json");
const moduleData: Module[] = require("@/src/data/json/module.json");

export default function WeaponBuilderLayout() {
  
  // useState Hook Setting

  // 1~10번째 슬롯 중 선택된 슬롯
  const [slot, setSlot] = useState<number>(0);

  // 무기 종류
  const [weapon, setWeapon] = useState<number | null>(null);

  // 모듈 수용량
  const [capacity, setCapacity] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  // 무기 선택 창 표시 여부
  const [showWeaponSelector, setShowWeaponSelector] = useState<boolean>(false);

  // 1~10번째 슬롯에 들어간 모듈
  const [activeModules, setActiveModules] = useState<(ModuleBuilder | null)[]>([null, null, null, null, null, null, null, null, null, null]);
  
  // 1~10번째 슬롯의 모듈 소켓 타입
  const [socket, setSocket] = useState<(string | null)[]>([null, null, null, null, null, null, null, null, null, null]);
    
  // 모듈 검색 내용
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 모듈 등급 필터
  const [moduleTierFilter, setModuleTierFilter] = useState<string | null>(null);

  // 모듈 소켓 필터
  const [moduleSocketFilter, setModuleSocketFilter] = useState<string | null>(null);

  // 무기 검색 내용
  const [searchWeaponTerm, setSearchWeaponTerm] = useState<string>("");

  // 무기 탄약 필터
  const [ammoTypeFilter, setAmmoTypeFilter] = useState<string | null>(null);

  // 무기 타입 필터
  const [weaponTypeFilter, setWeaponTypeFilter] = useState<string | null>(null);
  // useRef Hook Setting
  
  // 무기 선택 부분
  const weaponSelectorRef = useRef<HTMLDivElement>(null);
  
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

  const tierOptions = [
    { value: null, label: '전체 등급' },
    { value: '일반', label: '일반' },
    { value: '희귀', label: '희귀' },
    { value: '궁극', label: '궁극' },
    { value: '초월', label: '초월' },
  ];

  const ammoOptions = [
    { value: null, label: '전체 탄약' },
    { value: '일반탄', label: '일반탄' },
    { value: '특수탄', label: '특수탄' },
    { value: '충격탄', label: '충격탄' },
    { value: '고위력탄', label: '고위력탄' }
  ]

  const typeOptions = [
    { value: null, label: '전체 타입' },
    { value: '권총', label: '권총' },
    { value: '기관단총', label: '기관단총' },
    { value: '돌격소총', label: '돌격소총' },
    { value: '전술소총', label: '전술소총' },
    { value: '광선소총', label: '광선소총' },
    { value: '핸드 캐논', label: '핸드 캐논' },
    { value: '정찰소총', label: '정찰소총' },
    { value: '산탄총', label: '산탄총' },
    { value: '저격총', label: '저격총' },
    { value: '런처', label: '런처' }
  ]
  // 일반 함수

  const asdf = (data: string | null) => {
    if (data === "알만딘") return "Almandine.png"
    if (data === "세룰리안") return "Cerulean.png"
    if (data === "말라카이트") return "Malachite.png"
    if (data === "루틸") return "Rutile.png"
    if (data === "크산틱") return "Xantic.png"
    return "chipset.png"
  }

  // 티어에 따라 텍스트 색 클래스 반환
  const setClassWithTierText = (data: string) => {
    if (data === "일반") return "grade1_text" 
    if (data === "희귀") return "grade2_text" 
    if (data === "궁극") return "grade3_text" 
    if (data === "초월") return "grade4_text" 
    return "";
  }

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

  const setImageLinkWith = (data: string | null) => {
    if (data === "알만딘") return "/Almandine.png"
    if (data === "세룰리안") return "/Cerulean.png"
    if (data === "말라카이트") return "/Malachite.png"
    if (data === "루틸") return "/Rutile.png"
    if (data === "크산틱") return "/Xantic.png"
    return "/chipset.png"
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
  const handleWeaponClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWeaponSelector(true);
    document.addEventListener("click", handleOutsideClick);
  };

  // 무기 선택 창 밖을 클릭해서 닫히는 경우
  const handleOutsideClick = (event: MouseEvent) => {
    if (weaponSelectorRef.current && !weaponSelectorRef.current.contains(event.target as Node)) {
      setShowWeaponSelector(false);
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  // 드롭다운 메뉴 클릭 이벤트 전파 방지
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 무기를 선택한 경우
  const handleSetWeaponCick = (weaponNum: number) => {
    if (weapon === weaponNum) return;
    setWeapon(weaponNum);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTierFilterChange = (value: string | null) => {
    if (moduleTierFilter === value) return 
    setModuleTierFilter(value);
  };

  const handleSocketFilterChange = (value: string | null) => {
    if (moduleSocketFilter === value) return;
    setModuleSocketFilter(value);
  };

  const handleSearchWeaponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWeaponTerm(e.target.value);
  };

  const handleAmmoTypeFilterChange = (value: string | null) => {
    if (ammoTypeFilter === value) return;
    setAmmoTypeFilter(value);
  };

  const handleWeaponTypeFilterChange = (value: string | null) => {
    if (weaponTypeFilter === value) return;
    setWeaponTypeFilter(value);
  };

  // 데이터 필터링 함수
  const filterWeapons = (weapons: Weapon[]) => {
    return weapons.filter(weapon => {
      const matchesSearchTerm = weapon.weapon_name.toLowerCase().includes(searchWeaponTerm.toLowerCase());
      const matchesAmmoFilter = ammoTypeFilter ? weapon.weapon_rounds_type === ammoTypeFilter : true;
      const matchesTypeFilter = weaponTypeFilter ? weapon.weapon_type === weaponTypeFilter : true;
      return matchesSearchTerm && matchesAmmoFilter && matchesTypeFilter;
    });
  };

  const filterModules = (modules: Module[]) => {
    return modules.filter(module => {
      const matchesSearchTerm = module.module_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTierFilter = moduleTierFilter ? module.module_tier === moduleTierFilter : true;
      const matchesSocketFilter = moduleSocketFilter ? module.module_socket_type === moduleSocketFilter : true;
      return matchesSearchTerm && matchesTierFilter && matchesSocketFilter;
    });
  };

  return (
    <div className="max-w-5xl m-auto p-4">
      {
        // contextHolder : Notification 창이 뜨는 곳 지정
      }
      {contextHolder}
      <div className="flex">
        <div className="relative">
          {
            weapon !== null ?
            (
              <>
                <div className="w-60">
                  <div>
                    <div className={`text-lg font-bold ${setClassWithTierText(weaponData[weapon].weapon_tier)}`}>{weaponData[weapon].weapon_name}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>{weaponData[weapon].weapon_type}</div>
                    <div>{weaponData[weapon].weapon_rounds_type}</div>
                  </div>
                </div>
                <img 
                  className="w-60 h-20 border-2 border-dashed"
                  src={weaponData[weapon].image_url} 
                  onClick={handleWeaponClick}
                  alt={weaponData[weapon].weapon_name}
                />
              </>
            ) : (
              <>
                <div className="text-2xl">-</div>
                <div 
                  className="flex justify-center items-center w-60 h-20 border-2 border-dashed text-center"
                  onClick={handleWeaponClick}
                >
                  <div>무기 선택</div>
                </div>
              </>
            )
          }
          <div>수용량 : {capacity.reduce((sum, num) => sum + num, 0)} / 80</div>
          <div className="mt-4 text-xl font-bold">증가 능력치</div>
          {
            activeModules.map((item, idx) => {
              if (item === null) return;
              return (
                <div className="text-sm">{item.module_stat[item.levelnow].value}</div>
              )
              
            })
          }
          {showWeaponSelector && (
            <div
              ref={weaponSelectorRef}
              className="absolute left-10p flex flex-col justify-center w-[600px] p-4 font-bold color-white bg-navy z-10 rounded desktop:w-[930px]"
              onClick={handleDropdownClick}
            >
              <div className="w-5xl text-center text-2xl">무기 선택</div>
              <hr className="mt-4 mb-4" />
              <div className="flex mb-4">
                {/* <Input
                  placeholder="무기 검색"
                  value={searchWeaponTerm}
                  onChange={handleSearchWeaponChange}
                  style={{ marginRight: 16, width: 200, color: "black" }}
                />
                <Space>
                  <Select
                    defaultValue={null}
                    style={{ width: 130 }}
                    options={ammoOptions}
                    onChange={handleAmmoTypeFilterChange}
                  />
                  <Select
                    defaultValue={null}
                    style={{ width: 130 }}
                    options={typeOptions}
                    onChange={handleWeaponTypeFilterChange}
                  />
                </Space> */}
              </div>
              <div className="flex flex-row justify-between flex-wrap p-2 max-h-80 overflow-auto">
                {filterWeapons(weaponData).map((data, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col justify-center items-center w-44 mb-2 rounded ${setClassWithTierText(data.weapon_tier)}`}
                    onClick={() => {
                      setShowWeaponSelector(false);
                      document.removeEventListener("click", handleOutsideClick);
                      handleSetWeaponCick(idx);
                    }}
                  >
                    <img className="w-40 h-20 p-0.5" src={data.image_url} alt={data.weapon_name} />
                    <div>{data.weapon_name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-wrap w-full">
            {
              Array(10).fill(1).map((arr, i) => { return i}).map((item, idx) => {
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
                    className={`flex flex-col justify-around items-center w-[135px] h-40 m-[1%] bg-gray-400 dark:bg-darkhf box-border rounded cursor-pointer ${slot === item ? "border-2 border-black dark:border-white" : ""}`}
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
                          [...Array(activeModules[idx]!.module_stat!.length - 1)].map((_, idx2) => {
                            return (
                              <div className={`w-6 h-2 bg-darkdd mb-0.5 rounded ${activeModules[idx]!.module_stat.length - activeModules[idx]!.levelnow - 1 <= idx2 && "bg-yellow"}`}>

                              </div>
                            )
                          })
                        )
                        }
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <img src={!activeModules[idx] ? asdf(socket[idx]) : activeModules[idx]!.image_url} className="w-[60%]" />
                        {
                          activeModules[idx] !== null && (
                            <>
                              <div className="absolute flex bottom-28 w-12 p-0.5 text-center module_area">
                                <div className={`mr-0.5 w-6 h-6 ${setClassWithSocket(activeModules[idx]!.module_socket_type)}`}></div>
                                  {
                                    
                                    activeModules[idx]!.socketmatch ?
                                    <div className="text-green-500">
                                      {Math.ceil(activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].module_capacity / 2)}
                                    </div>
                                    :
                                    socket[idx] === null || socket[idx] === "소켓 선택" ?
                                    <div>
                                      {activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].module_capacity}
                                    </div>
                                    :
                                    <div className="text-red-500">
                                      {activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].module_capacity + 5}
                                    </div>
                                  }
                                </div>
                              <div className="text-sm">{activeModules[idx]!.module_name}</div>
                              <div className="text-sm">{activeModules[idx]!.module_type ? activeModules[idx]!.module_type : "-"}</div>
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
                            const capacitys = activeModules[idx]!.module_stat[activeModules[idx]!.levelnow].module_capacity;
                            if (newSocket[idx] === activeModules[idx]!.module_socket_type) {
                              activeModules[idx]!.socketmatch = true;
                              capacity[idx] = Math.ceil(capacitys / 2)
                            } else if (activeModules[idx] !== null && (newSocket[idx] !== activeModules[idx]!.module_socket_type))  {
                              activeModules[idx]!.socketmatch = false;
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
          <div className="flex mb-4">
            <Input
              placeholder="모듈 검색"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginRight: 16, width: 200, color: "black"}}
            />
            <Space>
              <Select
                defaultValue={null}
                style={{ width: 130 }}
                options={tierOptions}
                onChange={handleTierFilterChange}
              />
              <Select
                defaultValue={null}
                style={{ width: 130 }}
                options={options}
                onChange={handleSocketFilterChange}
              />
            </Space>
          </div>
          <div className="flex flex-wrap h-72 pt-4 overflow-y-scroll ix:mb-0">
            {
              weapon !== null &&
              (
                filterModules(moduleData).filter(module =>
                  module.module_class === weaponData[weapon].weapon_rounds_type
                ).map((module, idx) => {
                  return (
                    <Tooltip title={
                      <div className="flex flex-col w-60 p-2">
                        <div className="flex flex-row items-center justify-between pb-2 border-b font-bold">
                          <div className="text-lg">{module.module_name}</div>
                          <div>{module.module_tier}</div>
                        </div>
                        <div className="flex flex-row pt-2 pb-2">
                          <div><img className="w-20" src={module.image_url} alt={module.module_name} /></div>
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
                          className="relative w-28 flex flex-col pb-2 cursor-pointer"
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
                          <img className={`w-16 m-auto ${setClassWithTierBg(module.module_tier)}`} src={module.image_url} alt={module.module_name} />
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
