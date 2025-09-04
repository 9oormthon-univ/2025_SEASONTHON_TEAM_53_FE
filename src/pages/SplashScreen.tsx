import styled from 'styled-components';
import logoImage from '../assets/logo.svg';

// LoginPage와 동일한 레이아웃을 사용하되, 가운데 정렬을 위해 justify-content 변경
const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 로고만 표시되므로 'center'로 변경
  width: 100%;
  height: 100%;
  text-align: center;
`;

const TopArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
`;

export default function SplashScreen() {
  return (
    <PageContainer>
      <TopArea>
        <LogoImage src={logoImage} alt="taroutine 로고" />
      </TopArea>
    </PageContainer>
  );
}
