import React from 'react';

const Footer = () => {
  return (
    <div className="tc absolute bottom-2-ns bottom-1 w-100">
      <span className="white f5-ns f6 tracked fw3">
        Made by Jack Yeh with{' '}
        <a href="https://reactjs.org/" className="no-underline" style={{ color: '#61DAFB' }}>
          React
        </a>
      </span>
    </div>
  );
};

export default Footer;
