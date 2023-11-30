import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Recruitment from './pages/Recruitment/Recruitment';
import RecruitmentDetail from './pages/Recruitment/RecruitmentDetail';
import Chat from './pages/Chat';
import Essay from './pages/Essay/Essay';
import FindHome from './pages/FindHome';
import EBook from './pages/EBook/EBook';
import EbookDetail from './pages/EBook/EbookDetail';
import EbookViewer from './pages/EBook/EbookViewer';
import RecruitmentCreate from './pages/Recruitment/RecruitmentCreate';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EssayDetail from './pages/Essay/EssayDetail';
import EssayCreate from './pages/Essay/EssayCreate';
import RecruitmentEdit from './pages/Recruitment/RecruitmentEdit';
import EssayEdit from './pages/Essay/EssayEdit';

import MyPage from './pages/MyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Main /> },
            { path: 'signup', element: <Signup /> },
            { path: 'login', element: <Login /> },
            { path: 'mypage', element: <MyPage />},
            { path: 'recruitment', element: <Recruitment /> },
            { path: 'recruitment/detail/:jobId', element: <RecruitmentDetail /> },
            { path: 'recruitment/detail', element: <RecruitmentDetail /> },
            { path: 'recruitment/create', element: <RecruitmentCreate /> },
            { path: 'recruitment/edit/:jobId', element: <RecruitmentEdit /> },
            { path: 'ebook', element: <EBook /> },
            { path: 'ebook/search', element: <EBook /> },
            { path: 'ebook/detail/:bookId', element: <EbookDetail /> },
            { path: 'ebook/detail/viewer/:bookId', element: <EbookViewer /> },
            { path: 'chat', element: <Chat /> },
            { path: 'essay', element: <Essay /> },
            { path: 'essay/detail/:EssayId', element: <EssayDetail /> },
            { path: 'essay/create', element: <EssayCreate /> },
            { path: 'essay/edit/:EssayId', element: <EssayEdit /> },
            { path: 'findhome', element: <FindHome /> },
        ],
    },
]);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
