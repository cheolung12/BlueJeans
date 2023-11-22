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
import Essay from './pages/Essay';
import FindHome from './pages/FindHome';
import EBook from './pages/EBook/EBook';
import EbookDetail from './pages/EBook/EbookDetail';
import EbookViewer from './pages/EBook/EbookViewer';
import RecruitmentCreate from './pages/Recruitment/RecruitmentCreate';
import Signup from './pages/Signup';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: 'signup', element: <Signup />},
      { path: 'login', element: <Login />},
      { path: 'recruitment', element: <Recruitment /> },
      { path: 'recruitment/detail/:jobId', element: <RecruitmentDetail /> },
      { path: 'recruitment/detail', element: <RecruitmentDetail /> },
      { path: 'recruitment/create', element: <RecruitmentCreate /> },
      { path: 'ebook', element: <EBook /> },
      { path: 'ebook/keyword/:searchInput', element: <EBook /> },
      { path: 'ebook/detail/:bookId', element: <EbookDetail /> },
      { path: 'ebook/detail/viewer/:bookId', element: <EbookViewer /> },
      { path: 'chat', element: <Chat /> },
      { path: 'essay', element: <Essay /> },
      { path: 'findhome', element: <FindHome /> },
    ],
  },
]);

root.render(
    <>
        <RouterProvider router={router} />
    </>
);
