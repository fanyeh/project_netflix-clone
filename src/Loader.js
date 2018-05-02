import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner">
        <i className="fas fa-spinner fa-pulse f2 white w-100 tc" />
        <div className="white mt4 f5 tracked-mega">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
