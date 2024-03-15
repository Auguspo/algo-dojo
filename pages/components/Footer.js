import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 p-6 ">
      <div className="container mx-auto">
        <div className="flex justify-center text-white">
          <p>&copy; {new Date().getFullYear()} Tu Sitio Web. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
