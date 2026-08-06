import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="d-flex h-100">
      <div style={{width: '250px', flexShrink: 0}}>
        <Sidebar />
      </div>
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

