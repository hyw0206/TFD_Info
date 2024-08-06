import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from "next/link";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <div className="h-32 pt-2 footer fix:h-24">
        <div className="flex flex-row justify-items-center items-center max-w-4xl h-32 m-auto p-4 flex-wrap fix:flex-nowrap fix:h-24">
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/">TFD Info</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/descendant">계승자</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/weapon">무기</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/component">외장 부품</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/reactor">반응로</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/reward">보상 로테이션</Link></div>
        </div>
      </div>
      {props.children}
      <Analytics />
      <SpeedInsights />
      <div className="h-24 p-4 footer">
        <div className="max-w-4xl m-auto">
          © TFD Info All Rights Reserved. Hosted by Vercel. The First Descendant
          and all related logos are trademarks of Nexon.
        </div>
      </div>
    </>
  )
}
