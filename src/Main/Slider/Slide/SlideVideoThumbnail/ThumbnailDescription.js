import React from 'react';

const ThumbnailDescription = props => {
  return (
    <div className="absolute bottom-0 left-0 pl3 pr5 white">
      <h1 className="f4-ns f5 fw4 tracked ma0">{props.title}</h1>
      <p className="fw3 f6-ns f7 tracked ma0 pv2">{props.description}</p>
    </div>
  );
};

export default ThumbnailDescription;
