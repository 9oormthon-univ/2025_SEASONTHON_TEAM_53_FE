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
  max-height: 900px;

  // ⭐️ 그라데이션 배경을 아래쪽에서 타원형으로 퍼지도록 변경 ⭐️
  background: radial-gradient(circle at 50% 100%, #b48aeb 0%, #6c6fdf 19%, #0031ac 40%, #111111 63%);
  /* border-radius: 16px; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppBackground>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </AppBackground>
    </>
  );
}

export default App;
