import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyle.ts';

// 페이지들 import
import LoginPage from './pages/LoginPage.tsx';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App 컴포넌트가 공통 레이아웃 역할을 합니다.
    children: [
      // TODO: 나중에 홈페이지 만들면 여기에 추가
      // { path: "", element: <HomePage /> },

      {
        path: 'login', // http://.../login 경로
        element: <LoginPage />,
      },
      // 다른 페이지가 추가되면 여기에 계속해서 정의합니다.
      // { path: "signup", element: <SignupPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <GlobalStyle />
  </StrictMode>
);
