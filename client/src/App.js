import './App.css';
import { Outlet } from 'react-router-dom';
import TopNavbar from './components/common/TopNavbar';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <TopNavbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
