import { Outlet, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import MainFooter from './components/MainFooter';
import { useState } from 'react';
import { ThemeContext, lightTheme, darkTheme } from './styles/theme'; // theme import

const AppBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div<{ $backgroundStyle: string }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  max-height: 900px;

  // props로 받은 배경 스타일을 적용
  background: ${(props) => props.$backgroundStyle};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  // Outlet과 Footer를 세로로 배치하기 위해 flex-direction 추가
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1; // 남은 공간을 모두 차지
  overflow-y: auto; // 내용이 길어지면 스크롤
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 그라데이션 스타일 정의
const defaultGradient = `radial-gradient(
  circle at 50% 100%,
  #b48aeb 0%, #6c6fdf 19%, #0031ac 40%, #111111 63%
)`;

const mainPagesGradient = `radial-gradient(
  circle at 100% 0%,
  #B48AEB 0%, #6C6FDF 19%, #0031AC 40%, #111111 63%
)`;

function App() {
  const [theme, setTheme] = useState('dark');

  const location = useLocation();
  const mainPageGroup = ['/main', '/today-arcana', '/archive'];
  const showFooter = mainPageGroup.includes(location.pathname);
  const backgroundStyle = showFooter ? mainPagesGradient : defaultGradient;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyle />
          <AppBackground>
            <AppContainer $backgroundStyle={backgroundStyle}>
              <ContentWrapper>
                <Outlet />
              </ContentWrapper>
              {showFooter && <MainFooter />}
            </AppContainer>
          </AppBackground>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
