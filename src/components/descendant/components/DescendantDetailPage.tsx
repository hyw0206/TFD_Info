import { RootObject } from "@/src/data/descendant_type";

export default function DescendantDetailPage(props: {descendantId: string}) {
  const id = parseInt(props.descendantId);
  const datas: RootObject[] = require("../../../../src/data/descendant.json");
  const skillNames = ['Q', 'C', 'V', 'Z', 'P']
  return (
    <div className="max-w-6xl m-auto mt-8 ">
      <div className="flex items-center">
        <img className="w-28 border-2 border-black shaddw-lg" src={datas[id].descendant_image_url} />
        <div className="ml-4 text-2xl font-bold">{datas[id].descendant_name}</div>
      </div>
      <div className="mt-8 mb-4  text-xl font-bold">{datas[id].descendant_name} 스킬</div>
      <div className="flex">
        {
          datas[id].descendant_skill.map((skill, idx) => {
            return (
              <>
                <div className="relative">
                  <span className="absolute bottom-0 right-5 text-white font-bold text-xl">{skillNames[idx]}</span>
                  <img className="mr-4 w-24 skill" src={skill.skill_image_url}></img>
                </div>
              </>
            )
          })
        }
      </div>
 

      <div>{id}</div>

    </div>
    
  )
}