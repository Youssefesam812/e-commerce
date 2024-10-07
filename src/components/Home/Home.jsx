import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Home() {
  return <>
  
  <div className='min-h-screen h-[100vh] relative'>
  <Navbar />
  <Outlet />
  <Footer />
  </div>
  
  </>
}
