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

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Main /> },
            { path: 'recruitment', element: <Recruitment /> },
            // { path: 'recruitment/detail/:jobId', element: <RecruitmentDetail /> },
            { path: 'recruitment/detail', element: <RecruitmentDetail /> },
            { path: 'ebook', element: <EBook /> },
            { path: 'ebook/keyword/:searchInput', element: <EBook /> },
            { path: 'ebook/detail/:bookId', element: <EbookDetail /> },
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
