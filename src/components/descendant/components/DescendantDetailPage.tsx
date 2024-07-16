import { Descendant } from "@/src/data/descendant_type";
import DescendantSkillDetailPage from "./DescendantSkillDetailPage";
import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import DescendantStatDetailPage from "./DescendantStatDetailPage";

export default function DescendantDetailPage(props: {descendantId: string}) {
  
  const [skillId, setSkillId] = useState("0");
  const [level, setLevel] = useState("40");
  const descendantId = parseInt(props.descendantId);
  const datas: Descendant[] = require("@/src/data/descendant.json");
  const skillNames = ['Q', 'C', 'V', 'Z', 'P']
  const levelOptions = Array.from({length: 40 }, (_, i) => ({
    value: `${i + 1}`,
    label: `LV.${i + 1}`
  }));
  const onChangeGetLevel = (level: string) => {
    setLevel(level);
  }

  const onClickGetDetail = (id: string) => {
    // 리렌더링 방지
    if (skillId === id) return;
    console.log("리렌더링");
    setSkillId(id);
  }
  useEffect(() => {
    setSkillId("0");
    setLevel("40");
  }, [descendantId])
  return (
    <div className="m-auto mt-8">
      <div className="flex items-center">
        <img className="w-20 border-2 border-black shaddw-lg" src={datas[descendantId].descendant_image_url} />
        <div className="ml-4 text-2xl font-bold">{datas[descendantId].descendant_name}</div>
      </div>
      <div className="mt-8 mb-4 text-xl"><strong>{datas[descendantId].descendant_name}</strong> 스킬</div>
      <div className="flex">
        {
          datas[descendantId].descendant_skill.map((skill, idx) => {
            return (
              <>
                <div id={String(idx)} className={String(idx) === skillId ? "relative selectedskill mr-4" : "relative mr-4"} key={skill.skill_name} onClick={() => onClickGetDetail(String(idx))}>
                  <span className="absolute bottom-0 right-1 text-white font-bold text-xl">{skillNames[idx]}</span>
                  <img className="w-16 skill" src={skill.skill_image_url}></img>
                </div>
              </>
            )
          })
        }
      </div>
      <DescendantSkillDetailPage descendantId={props.descendantId} skillId={skillId} />
      <div className="mt-12 mb-4 text-xl"><strong>{datas[descendantId].descendant_name}</strong> 스탯</div>
      <Space wrap>
        <Select
          value={`LV.${level}`}
          style={{width: 120, marginBottom: 8}}
          options={levelOptions}
          onChange={onChangeGetLevel}
          />
      </Space>
      <DescendantStatDetailPage descendantId={props.descendantId} level={level} />

    </div>
    
  )
}