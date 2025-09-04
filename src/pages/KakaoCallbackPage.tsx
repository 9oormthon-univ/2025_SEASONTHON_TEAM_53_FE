import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function KakaoCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      if (!code) {
        console.error('인가 코드가 없습니다.');
        navigate('/login', { replace: true });
        return;
      }

      try {
        // 백엔드 서버에 인가 코드를 보내 POST 요청
        const response = await axios.post(
          '/api/auth/kakao', // 백엔드 로그인 API 엔드포인트
          {
            authorizationCode: code,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
        );

        // 백엔드로부터 받은 응답 처리
        console.log('백엔드 응답:', response.data);

        // 예: 백엔드가 JWT 토큰을 주면 localStorage에 저장
        // const accessToken = response.data.accessToken;
        // localStorage.setItem('token', accessToken);

        // 로그인 성공 후 메인 페이지로 이동
        navigate('/', { replace: true });
      } catch (error) {
        console.error('카카오 로그인 처리 실패:', error);
        // 에러 발생 시 로그인 페이지로 다시 이동
        navigate('/login', { replace: true });
      }
    };

    kakaoLogin();
  }, [navigate]);

  return (
    <div>
      <p>로그인 처리 중입니다. 잠시만 기다려 주세요...</p>
    </div>
  );
}
