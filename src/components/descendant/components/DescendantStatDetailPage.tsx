import { Descendant } from "@/src/data/descendant_type";

export default function DescendantStatDetailPage(props: {descendantId: string, level: string}) {
  const descendantId = parseInt(props.descendantId);
  const level = parseInt(props.level) - 1;
  const datas: Descendant[] = require("@/src/data/descendant.json");
  return (
    <div className="mb-6">
      {
         datas[descendantId].descendant_stat[level].stat_detail.map((stat) => {
          return (
            <>
              <div className="flex mt-2">
                <div className="w-44 text-xl text-center opacity-75">{stat.stat_type}</div>
                <div className="w-44 text-lg text-center">{stat.stat_value}</div>
              </div>
            </>
          )
        })
      }
 
    </div>    
  )
}