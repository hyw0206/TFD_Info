export interface StatInfo {
  '발사 속도': _;
  '약점 배율': _;
  '환경 파괴력(무기)': _;
  '유효사거리 (감소 시작)': _;
  '유효사거리 (감소 종료)': _;
  '거리별 공격력 감소비율': _;
  '최대사거리': _;
  '지향사격 정확도': _;
  '조준사격 정확도': _;
  '크로스헤어 최소 크기': _;
  '크로스헤어 최대 크기': _;
  '이동 시 크로스헤어 변화량': _;
  '발사 시 크로스헤어 변화량': _;
  '조준 사격 시 크로스헤어 변화량': _;
  '조준 복구 속도': _;
  '크로스헤어 변화 속도': _;
  '장탄량': _;
  '장전량': _;
  '재장전 시간': _;
  '탄환 소모량': _;
  '전력 질주 속도': _;
  '이동 속도': _;
  '사격 중 이동 속도': _;
  '조준 중 이동 속도': _;
  '관통': _;
  '시체 미는 힘': _;
  '경직 공격값': _;
  '총기 치명타 확률': _;
  '총기 치명타 배율': _;
  '속성 상태효과 부여확률': _;
  '파열': _;
  '산탄량': _;
  '격파': _;
  '관통력': _;
  '폭발 거리 공격력 감소 비율': _;
  '런쳐 폭발 반경': _;
  '광선소총 충전량 증가 속도': _;
  '광선소총 충전량 감소 속도': _;
}
interface _ {
  sum: number;
  min: number;
  max: number;
  count: number;
  average: number;
}