import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-indigo-600 p-6 '>
      <div className='container mx-auto'>
        <div className='flex justify-center text-center text-white'>
          <p>
            &copy; {new Date().getFullYear()} Algo Dojo. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
