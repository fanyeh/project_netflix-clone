import React, { Component } from 'react';

class SlideBackdropImage extends Component {
  render() {
    const { transitionTimeout, transitionEndHandler, imageSrc, isHover } = this.props;
    return (
      <img
        onTransitionEnd={transitionEndHandler}
        src={imageSrc}
        alt=""
        style={{
          transition: `opacity ${transitionTimeout}ms`,
          opacity: isHover ? 0.95 : 1,
        }}
      />
    );
  }
}

export default SlideBackdropImage;
