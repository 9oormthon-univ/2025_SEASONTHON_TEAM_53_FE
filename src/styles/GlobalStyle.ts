import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  /* --- 추가적인 전역 스타일 --- */
  * {
    box-sizing: border-box; /* 모든 요소에 box-sizing 적용 */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit; /* 링크의 기본 파란색과 밑줄 제거 */
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }
`;

export default GlobalStyle;
