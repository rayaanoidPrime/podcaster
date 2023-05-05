import React from 'react';
import { Sidebar } from './sidebar';
// import { SideBar } from './SideBar'

interface LayoutProps {
    children: React.ReactNode;
  }


export const Layout : React.FC<LayoutProps>  = ({ children }) => {

    return (
      <main className=" min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] ml-auto mr-auto max-w-full">
        <div className="grid grid-cols-5 gap-4 py-4 mr-auto ml-auto" >
          <div><Sidebar /></div>
          <div className='col-start-1 sm:col-start-2 sm:col-span-5 col-span-5 px-5 sm:px-10' >{children}</div>
        </div>
      </main>
      );

}