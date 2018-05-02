import React from 'react';
import classNames from 'classnames';
const IntroButton = props => {
  return (
    <div className="dib ph5-l ph4-m ph2 pv3-l pv2-m pv0 bg-black-40 mt4-ns mt2 introButton">
      <i className={classNames('fas mr3 f4-l f5-m f7', props.icon)} />
      <div className="dib h-100 fw4 f4-l f5-m  f7">{props.name}</div>
    </div>
  );
};

export default IntroButton;
