import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';

import MainPage from './pages/MainPage.tsx';
import KakaoCallbackPage from './pages/KakaoCallbackPage.tsx';
import EntryPage from './pages/EntryPage.tsx';
import SignupPage from './pages/SignUpPage.tsx';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <EntryPage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'oauth/kakao/callback',
        element: <KakaoCallbackPage />,
      },
      {
        path: 'signup', // 회원가입 페이지 경로
        element: <SignupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
