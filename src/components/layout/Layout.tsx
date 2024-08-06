import Link from "next/link";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <div className="h-24 pt-2 footer">
        <div className="flex flex-row justify-items-center items-center max-w-4xl m-auto h-24 flex-wrap min[670px]:flex-nowrap">
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/">TFD Info</Link></div>
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/descendant">계승자</Link></div>
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/weapon">무기</Link></div>
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/component">외장 부품</Link></div>
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/reactor">반응로</Link></div>
          <div className="text-2xl font-bold color-white mr-8 text-center"><Link href="/reward">보상 로테이션</Link></div>
        </div>
      </div>
      {props.children}
      <div className="h-24 pt-2 footer">
        <div className="max-w-4xl m-auto">
          © TFD Info All Rights Reserved. Hosted by Vercel. The First Descendant
          and all related logos are trademarks of Nexon.
        </div>
      </div>
    </>
  )
}
