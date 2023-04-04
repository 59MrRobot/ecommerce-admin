import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

export const Root: React.FC = React.memo(
  () => {
    const user = useSelector((state: any) => state.user.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/auth/login");
      }
    }, [navigate, user])

    return (
      <>
        <Topbar />

        <div className="container">
          <Sidebar />

          <Outlet />
        </div>
      </>
    )
  }
);