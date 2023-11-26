import './App.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TopNavbar from './components/common/TopNavbar';
import SideNavBar from './components/common/SideNavBar';
import Wrapper from './components/common/Wrapper';
import Footer from './components/common/Footer';

function App() {
  const location = useLocation();
  const noSideNavbarPath = ['/', '/login', '/signup'];
  const noTopNavbarPath = ['/login', '/signup'];
  const noFooterPath = [];
  return (
    <>
      {!noTopNavbarPath.includes(location.pathname) && <TopNavbar />}
      <Wrapper>
        <div className='flex justify-between sm:flex-row flex-col items-center w-full px-12 mb-20'>
          {!noSideNavbarPath.includes(location.pathname) && <SideNavBar />}
          <Outlet />
        </div>
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
