import styled from 'styled-components';

// --- 페이지 구조를 위한 Styled Components ---

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 50px 20px;
`;

const LogoImage = styled.div`
  width: 250px;
  height: 150px;
  background-color: #e0e0e0;
  border: 1px solid #cccccc;
`;

const ContentArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ServiceTitle = styled.h1`
  font-size: 1.2rem;
  margin: 0;
  color: #fff; // 텍스트 색상 추가
`;

const ButtonArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const PrimaryButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 15px;
  border: 1px solid #cccccc;
  background-color: #f0f0f0; // 배경색 추가
  font-size: 1rem;
`;

const SocialButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 0.9rem;
  color: #fff; // 텍스트 색상 추가
  background-color: transparent;
`;

export default function LoginPage() {
  return (
    <PageContainer>
      <LogoImage />

      <ContentArea>
        <ServiceTitle>taroutine</ServiceTitle>
        <ButtonArea>
          <PrimaryButton>시작하기</PrimaryButton>
          <SocialButton>카카오로 시작하기</SocialButton>
        </ButtonArea>
      </ContentArea>

      <div></div>
    </PageContainer>
  );
}
