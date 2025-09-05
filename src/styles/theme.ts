import { createContext } from 'react';
import { type DefaultTheme } from 'styled-components';

// 라이트 모드 색상 정의
export const lightTheme: DefaultTheme = {
  bgColor: '#F5F5F5',
  textColor: '#121212',
  cardColor: '#FFFFFF',
  borderColor: '#E0E0E0',
  subTextColor: '#555555',
};

// 다크 모드 색상 정의
export const darkTheme: DefaultTheme = {
  bgColor: '#121212',
  textColor: '#FFFFFF',
  cardColor: 'rgba(255, 255, 255, 0.1)',
  borderColor: '#555555',
  subTextColor: '#CCCCCC',
};

// 테마 상태와 토글 함수를 위한 Context 생성
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});
