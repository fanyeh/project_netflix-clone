import React from 'react';

const Footer = () => {
  return (
    <div className="tc absolute w-100" style={{ bottom: '5rem' }}>
      <span className="white f5 tracked fw3">
        Made by Jack Yeh with{' '}
        <a href="https://reactjs.org/" className="no-underline" style={{ color: '#61DAFB' }}>
          React
        </a>
      </span>
    </div>
  );
};

export default Footer;
