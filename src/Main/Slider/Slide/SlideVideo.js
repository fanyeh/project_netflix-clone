import React, { Component } from 'react';

class SlideVideo extends Component {
  render() {
    const { elementRef, title, size, play, show, transitionTimeout, videoSrc } = this.props;
    return (
      <iframe
        ref={elementRef}
        title={title}
        width={play ? size.width : 0}
        height={play ? size.height : 0}
        style={{
          opacity: play && show ? 1 : 0,
          transition: `opacity ${transitionTimeout}ms`,
        }}
        src={videoSrc}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        className="z-5 absolute top-0 left-0 "
      />
    );
  }
}

export default SlideVideo;
