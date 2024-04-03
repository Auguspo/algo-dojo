import React from 'react';
import { Nav } from './nav.component';
import { Footer } from './footer.component';

export const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};
