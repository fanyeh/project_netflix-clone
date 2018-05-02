import React, { Component } from 'react';
import SlideBackdropImage from './SlideBackdropImage';
import SlideVideoThumbnail from './SlideVideoThumbnail';
import SlideVideo from './SlideVideo';
import classNames from 'classnames';
import axios from 'axios';

const hoverRatio = 1.95;
const hoverOffset = -hoverRatio + 1;

const defaultStyles = {
  width: '100%',
  height: '100%',
  left: '0',
  right: '0',
  top: '0',
};

const standardHoverStyles = {
  left: `${hoverOffset * 50}%`,
  top: `${hoverOffset * 50}%`,
};

const leftEndHoverStyles = {
  top: `${hoverOffset * 50}%`,
};
const rightEndHoverStyle = {
  top: `${hoverOffset * 50}%`,
  left: `${hoverOffset * 100}%`,
};

const hoverSize = {
  width: `${hoverRatio * 100}%`,
  height: `${hoverRatio * 100}%`,
};

const videoState = {
  play: 'playVideo',
  pause: 'pauseVideo',
};

class Slide extends Component {
  constructor(props) {
    super(props);
    this.timeOutID = -1;
    this.hoverCallback = null;
    this.videoElement = React.createRef();
    this.videoThumbnail = '';
    this.state = {
      hover: false,
      hoverStyles: defaultStyles,
      showVideo: false,
      video: '',
      videoThumbnail: '',
      playVideo: false,
    };
  }

  componentDidMount() {
    const { movieData, type, api } = this.props;
    const slide = this;
    if (type === 'slide') {
      axios
        .post(`${api}`, {
          title: movieData.title,
        })
        .then(function(response) {
          slide.videoData = response.data;
          slide.setState({ videoThumbnail: response.data.thumbnail });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  componentDidUpdate(prevState) {
    // Callback while hover on sliding
    if (this.hoverCallback) {
      this.hoverCallback();
      this.resetHoverCallback();
    }
  }

  hoverHandler = (e, timeout = 400) => {
    const { pos, isTransition } = this.props;
    if (isTransition) {
      // Callback while hover on sliding
      this.hoverCallback = () => {
        this.hoverHandler(null, 0);
      };
    } else {
      if (this.isVisibleSlide(pos)) {
        this.timeOutID = setTimeout(() => {
          const hoverStyles = Object.assign(this.getStylesByPosition(pos), hoverSize);
          this.performTransition(hoverStyles);
        }, timeout);
      }
    }
  };

  unHoverHandler = e => {
    this.resetHoverCallback();
    this.pauseVideo();
    this.state.hover ? this.performTransition() : clearTimeout(this.timeOutID);
  };

  isVisibleSlide(pos) {
    const { first, last } = this.props;
    return pos >= first && pos <= last;
  }

  getStylesByPosition = pos => {
    const { first, last } = this.props;
    switch (pos) {
      case first:
        return leftEndHoverStyles;
      case last:
        return rightEndHoverStyle;
      default:
        return standardHoverStyles;
    }
  };

  performTransition = (transitonStyles = defaultStyles) => {
    this.setState(prevState => ({
      hover: !prevState.hover,
      hoverStyles: transitonStyles,
    }));
    this.props.hover(this.props.pos);
  };

  toggleVideo = () => {
    if (this.state.hover) {
      this.setState({ showVideo: true });
    }
  };

  pauseVideo = () => {
    this.changeVideoState(videoState.pause);
    this.setState({
      playVideo: false,
      showVideo: false,
    });
  };

  playVideo = () => {
    if (this.videoLink) {
      this.changeVideoState(videoState.play);
    } else {
      this.videoLink = this.videoData.video;
    }
    this.setState({ playVideo: true });
  };

  changeVideoState(state) {
    let iframe = this.videoElement.current.contentWindow;
    iframe.postMessage(`{"event":"command","func":"${state}" ,"args":""}`, '*');
  }

  resetHoverCallback = () => {
    this.hoverCallback = null;
  };

  render() {
    const { hoverStyles, showVideo, hover, videoThumbnail, playVideo } = this.state;
    const { width, hoverTimeout, type, height, movieData, imageBaseURL } = this.props;
    const transition = { transition: `all ${hoverTimeout}ms` };
    const overview = movieData.overview ? movieData.overview.split('.') : '';
    const videoDimension = { width: width * 1.95, height: height * 1.95 };
    const slideStyles = {
      width: `${width}px`,
      height: `${height}px`,
      visibility: type === 'slide' ? 'visible' : 'hidden',
    };
    return (
      <div className="flex-shrink-0 relative" data-type="slide" style={{ ...slideStyles }}>
        <div
          className={classNames('absolute overflow-hidden cp slideContent')}
          style={{ ...hoverStyles, ...transition }}
          onMouseEnter={type === 'slide' ? this.hoverHandler : undefined}
          onMouseLeave={type === 'slide' ? this.unHoverHandler : undefined}
        >
          <div>
            <SlideBackdropImage
              transitionTimeout={hoverTimeout}
              transitionEndHandler={this.toggleVideo}
              imageSrc={`${imageBaseURL}${movieData.backdrop_path}`}
              isHover={hover}
            />

            <SlideVideoThumbnail
              size={videoDimension}
              title={movieData.title}
              description={`${overview[0]}.`}
              thumbnail={videoThumbnail}
              show={showVideo}
              clickHandler={this.playVideo}
              transitionTimeout={hoverTimeout}
            />

            <SlideVideo
              elementRef={this.videoElement}
              title={movieData.title}
              size={videoDimension}
              play={playVideo}
              show={showVideo}
              transitionTimeout={hoverTimeout}
              videoSrc={this.videoLink}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Slide;
