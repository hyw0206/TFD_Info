import axios from 'axios'
import Head from 'next/head'
import { useState, useEffect, ChangeEvent } from 'react'
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
export default function Home() {
  const router = useRouter();
  interface UserOuid {
    ouid: string;
  }
  const [nickname, setNickname] = useState<string>('');
  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    console.log(nickname);
  }

  const fetchUserId = async () => {
    const response = await axios.get<UserOuid>('/api/userId', {
      params: {
        user_name: nickname
      }
    });
    const userOuid = response.data.ouid;

    const response_data = await axios.get('api/userBasic', {
      params: {
        ouid: userOuid
      }
    });

    console.log(response_data)
  }

  const routeSearchPage = (nickname: string): void => {
      nickname = encodeURIComponent(nickname)
      router.push({
        pathname: `/search/[nickname]`,
        query: { "nickname": nickname },
      },
      `/search/${nickname}`
    );
  }

  return (
    <>
      <Head>
        <title>TFD Info</title>
        <meta name="description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="hyw0206" />
        <meta property="og:title" content="TFD Info" />
        <meta property="og:description" content="퍼스트 디센던트 정보 사이트" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:url" content="https://tfdinfo.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TFD Info" />
        <meta name="twitter:description" content="퍼스트 디센던트 정보 사이트" />
        <meta name="twitter:image" content="/logo.webp" />
      </Head>
      <div className="text-center">
        {/* <div className="mt-4">유저 검색 ex{")"} 닉네임#1234</div>
        <div className="flex justify-center items-center mt-4">
          <Input 
            placeholder="닉네임#태그" 
            className="w-60 mr-4"
            value={nickname}
            onChange={handleChangeNickname}
          />
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={() => routeSearchPage(nickname)}
          >
            검색
          </Button>
        </div> */}
        <div className="pt-4">상단의 메뉴로 이동해주세요.</div>
        <div>각 무기 / 계승자 상세 페이지에서 장착 가능한 전체 모듈을 확인 가능합니다!</div>
        <br />
        <div className="font-bold"><a target="_blank" href="https://github.com/hyw0206/TFD_Info?tab=readme-ov-file#%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EB%82%B4%EC%97%AD">사이트 업데이트 내역 바로 가기</a></div>
       
      </div>
    </>
  )
}
