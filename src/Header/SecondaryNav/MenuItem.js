import React from 'react';
import classNames from 'classnames';
const MenuItem = props => {
  return (
    <li
      className={classNames('list pv2 f7 fw7 tracked ml3 cp', {
        'underline-hover': props.underlineHover,
      })}
    >
      {props.children}
    </li>
  );
};

export default MenuItem;
