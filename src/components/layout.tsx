import React from 'react';
import { Sidebar } from './sidebar';
// import { SideBar } from './SideBar'

interface LayoutProps {
    children: React.ReactNode;
  }


export const Layout : React.FC<LayoutProps>  = ({ children }) => {

    return (
        <div className="grid grid-cols-4 gap-4 py-4 ml-auto" >
          <div><Sidebar /></div>
          <div className='col-start-1 sm:col-start-2' >{children}</div>
        </div>
      );

}