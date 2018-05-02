import React from 'react';
import classNames from 'classnames';
/* TODO Cetner video play icon and remove overview on small screen */

const VideoPlayButton = props => {
  return (
    <div className={classNames('playButton bg-black-50 ba br-100 bw2 b--white', props.className)}>
      <i className="fas fa-play playIcon f2-l" onClick={props.clickHandler} />
    </div>
  );
};

export default VideoPlayButton;
