import './App.css';
import { Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TopNavbar from './components/common/TopNavbar';
import SideNavBar from './components/common/SideNavBar';
import Wrapper from './components/common/Wrapper';
import Footer from './components/common/Footer';

function App() {
    const location = useLocation();


  // 맨 위 Navbar가 필요없는 페이지 경로
  const noTopNavbarPath = [];
  // 사이드 Navbar가 필요없는 페이지 경로
  const noSideNavbarPath = ['/', '/recruitment/create'];
  // footer가 필요없는 경로
  const noFooterPath = [];
  // 레이아웃 필요없는 전체화면 페이지
  const fullScreenPagePath = ['/', '/login', '/signup', '/mypage'];

  const fullScreenDynamicUrl = location.pathname.startsWith(
    '/ebook/detail/viewer'
  );
  const noSideNavbarDynamicUrl =
    location.pathname.startsWith('/recruitment/edit');


    return (
        <>
            {!(fullScreenPagePath.includes(location.pathname) || fullScreenDynamicUrl) ? (
                <>
                    {!noTopNavbarPath.includes(location.pathname) && <TopNavbar />}
                    <Wrapper>
                        <div className="flex justify-between sm:items-start items-center sm:flex-row flex-col w-full mt-10 mb-20">
                            {!(noSideNavbarPath.includes(location.pathname) || noSideNavbarDynamicUrl) && <SideNavBar />}
                            <Outlet />
                        </div>
                        {!noFooterPath.includes(location.pathname) && <Footer />}
                    </Wrapper>
                </>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default App;
