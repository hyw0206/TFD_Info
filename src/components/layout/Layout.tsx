import { Analytics } from '@vercel/analytics/react'
import Link from "next/link";
import { Switch } from 'antd';
import { useEffect, useState } from 'react';

export default function Layout(props: { children: JSX.Element }) {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    setIsOpen(false);
  }, [props.children]);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-black text-white dark:bg-white dark:text-black z-10 min-w-[800px]">
        <div className="flex items-center h-full px-4 max-w-4xl mx-auto font-bold text-lg">
          <div className="flex-1 text-center">
            <Link href="/">TFD Info</Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/descendant">계승자</Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/weapon">무기</Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/component">외장 부품</Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/reactor">반응로</Link>
          </div>
          <div className="flex-1 text-center">
            <Link href="/reward">보상 로테이션</Link>
          </div>
          <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-lg font-medium text-white dark:text-black"
      >
        <span className="text-lg font-bold">빌더</span>
        <span className={`${isOpen ? 'rotate-180' : ''} transition-transform`}>&#9660;</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-4 mt-2 w-24 bg-white dark:bg-black border border-gray-300 dark:text-white rounded-lg shadow-lg z-100 text-center">
          <Link href="/weapon-builder">
            <a className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">무기</a>
          </Link>
          <Link href="/descendant-builder">
            <a className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">계승자</a>
          </Link>
        </div>
      )}
    </div>
          <div className="absolute top-12 right-4">
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(prevMode => !prevMode)}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </div>
      </div>
      <div className="pt-16 pb-24 min-w-[800px] min-h-[200dvh] bg-white dark:bg-black dark:text-white fix:min-h-[100dvh]">
        {props.children}
      </div>
      <Analytics />
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-black text-white dark:bg-white dark:text-black min-w-[800px]">
        <div className="max-w-full mx-auto p-4 text-center">
          © TFD Info All Rights Reserved. Hosted by Vercel. The First Descendant
          and all related logos are trademarks of Nexon.
        </div>
      </div>
    </>
  )
}
