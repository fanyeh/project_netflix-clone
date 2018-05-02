import React, { Component } from 'react';
import classNames from 'classnames';

class SliderButton extends Component {
  render() {
    const { clickHandler, size, className, icon } = this.props;
    return (
      <div
        className={classNames(
          'absolute ph3 bottom-0 bg-black-50 z-5 white relative cp fw3 sliderButton',
          className,
        )}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        <i
          className={classNames('fas f2 abs-center sliderButtonIcon cp', icon)}
          onClick={clickHandler}
        />
      </div>
    );
  }
}

export default SliderButton;
