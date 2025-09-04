import styled from 'styled-components';
import logoImage from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; // 요소들을 위, 중간, 아래로 분산
  width: 100%;
  height: 100%;
  padding: 50px 20px 30px; // 하단 패딩 조정
  text-align: center;
`;

const TopArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; // 로고와 설명 텍스트 사이 간격
  margin-top: 80px; // 상단 여백
`;

const LogoImage = styled.img`
  width: 200px; // 로고 이미지의 너비를 설정합니다. (원하는 크기로 조절)
  height: auto; // 높이는 비율에 맞게 자동으로 조절됩니다.
`;

const SubText = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8); // 투명도 있는 흰색
  margin: 0;
`;

const ButtonArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px; // 버튼 사이의 간격
  width: 100%;
  margin-bottom: 20px; // 하단 여백
`;

const BaseButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 15px 20px;
  border-radius: 12px; // 둥근 모서리
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none; // 기본 테두리 제거
`;

const EmailLoginButton = styled(BaseButton)`
  background-color: white;
  color: #333;
`;

const KakaoLoginButton = styled(BaseButton)`
  background-color: #fee500; // 카카오 노란색
  color: #3c1e1e; // 카카오 글씨색
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; // 아이콘과 텍스트 사이 간격
`;

// 카카오 아이콘 플레이스홀더

export default function LoginPage() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmailLogin = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <PageContainer>
      <TopArea>
        <LogoImage src={logoImage} alt="taroutine 로고" />
        <SubText>
          가볍게 쓰는 하루 기록,
          <br />
          따뜻하게 쌓이는 마음의 루틴
        </SubText>
      </TopArea>

      <ButtonArea>
        <EmailLoginButton onClick={handleEmailLogin}>이메일로 시작하기</EmailLoginButton>
        <KakaoLoginButton onClick={handleKakaoLogin}>카카오로 시작하기</KakaoLoginButton>
      </ButtonArea>

      {/* 하단 여백 확보용 (justift-content: space-between 때문에) */}
      {/* <div /> */}
    </PageContainer>
  );
}
