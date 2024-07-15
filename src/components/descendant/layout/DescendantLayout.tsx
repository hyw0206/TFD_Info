import { useState } from "react";
import { RootObject } from "../../../../src/data/descendant_type";
import DescendantDetailPage from "../components/DescendantDetailPage";
export default function DescendantLayoutPage() {
  const [descendantId, setDescendantId] = useState("0");
  const datas = require("../../../../src/data/descendant.json");
  const onClickGetDetail = (id: string) => {
    // 리렌더링 방지
    if (descendantId === id) return;
    console.log("리렌더링");
    setDescendantId(id);
  }
  return (
    <div className="max-w-6xl m-auto">
      <div className="mt-8 ml-6 mb-4 text-2xl font-bold">계승자</div>
      <div className="mt-2 ml-4 pt-2 pl-4 pb-2 text-lg text-white area">계승자 목록</div>
      <div className="ml-4 flex flex-row flex-wrap border">
      { 
        datas?.map((data: RootObject, idx: number) => {
          return (
            <div id={String(idx)} className="mt-2 w-40" key={data.descendant_id} onClick={() => onClickGetDetail(String(idx))}>
              <img className="w-24 m-auto border-2 border-black shadow-lg" src={data.descendant_image_url} />
              <div className="text-lg text-center">{data.descendant_name}</div>
            </div>
          );
      })}
      </div>
      <DescendantDetailPage descendantId={descendantId} />
    </div>
  )
}