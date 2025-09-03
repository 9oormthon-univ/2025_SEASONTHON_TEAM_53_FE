import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const AppBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  max-height: 850px;
  background-color: #555555;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppBackground>
        <AppContainer>
          <Outlet /> {/* 이 부분이 페이지 내용으로 교체됩니다. */}
        </AppContainer>
      </AppBackground>
    </>
  );
}

export default App;
