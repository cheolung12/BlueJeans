import './App.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TopNavbar from './components/common/TopNavbar';

function App() {
  const location = useLocation();
  const path = ['/login', '/signup'];

  return (
    <>
     {!path.includes(location.pathname) && <TopNavbar />}
      <Outlet />
    </>
  );
}

export default App;
