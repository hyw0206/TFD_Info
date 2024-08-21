import { userDataBasic } from "@/src/data/type/userdatabasic";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchLayoutPage(props: { nickname: string }) {
  const { nickname } = props;

  // 상태 정의
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userBasicData, setUserBasicData] = useState<userDataBasic | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/userId', {
          params: {
            user_name: nickname
          }
        });

        const userOuid = response.data.ouid;

        // 사용자 기본 정보 가져오기
        const response_data = await axios.get('/api/userBasic', {
          params: {
            ouid: userOuid
          }
        });

        // 사용자 데이터 저장
        setUserBasicData(response_data.data);

      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.error || '에러 발생');
        } else {
          setError('알 수 없는 에러 발생');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [nickname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl m-auto p-4">
      <div className="ml-4 text-lg">{userBasicData?.user_name}</div>
      <div className="ml-4">마스터리 랭크 Lv.{userBasicData?.mastery_rank_level} {userBasicData?.mastery_rank_exp} EXP</div>
    </div>
  );
}
