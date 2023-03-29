import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

export const Root: React.FC = React.memo(
  () => {
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