import { Analytics } from '@vercel/analytics/react'
import Link from "next/link";
import { Switch } from 'antd';
import { useEffect, useState } from 'react';

export default function Layout(props: { children: JSX.Element }) {

  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  return (
    <>
      <div className="h-32 pt-2 footer fix:h-24 dark:bg-darkhf dark:text-gray-100">
        <div className="flex flex-row justify-items-center items-center max-w-4xl h-32 m-auto p-4 flex-wrap fix:flex-nowrap fix:h-24">
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/">TFD Info</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/descendant">계승자</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/weapon">무기</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/component">외장 부품</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/reactor">반응로</Link></div>
          <div className="text-xl font-bold color-white mr-8 text-center"><Link href="/reward">보상 로테이션</Link></div>
          <div className="fixed top-4 right-4">
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(prevMode => !prevMode)}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen dark:bg-darkbg dark:text-gray-100">
        {props.children}
      </div>
      <Analytics />
      <div className="h-24 p-4 footer dark:bg-darkhf dark:text-gray-100">
        <div className="max-w-4xl m-auto">
          © TFD Info All Rights Reserved. Hosted by Vercel. The First Descendant
          and all related logos are trademarks of Nexon.
        </div>
      </div>
    </>
  )
}
