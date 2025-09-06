import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';

// import MainPage from './pages/MainPage.tsx';
import KakaoCallbackPage from './pages/KakaoCallbackPage.tsx';
import EntryPage from './pages/EntryPage.tsx';
import SignupPage from './pages/SignUpPage.tsx';
import MyDayPage from './pages/MyDayPage.tsx';
import ArchivePage from './pages/ArchievePage.tsx';
import ArchiveDetailPage from './pages/ArchieveDetailPage.tsx';

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
      // {
      //   path: 'main',
      //   element: <MainPage />,
      // },
      {
        path: 'today-arcana', // '나의 하루' 페이지 경로
        element: <MyDayPage />,
      },
      {
        path: 'archive', // '모아보기' 페이지 경로 (나중에 만들 페이지)
        element: <ArchivePage />, // 임시 컴포넌트
      },
      {
        path: 'oauth/kakao/callback',
        element: <KakaoCallbackPage />,
      },
      {
        path: 'signup', // 회원가입 페이지 경로
        element: <SignupPage />,
      },
      {
        path: 'archive/:cardName',
        element: <ArchiveDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
