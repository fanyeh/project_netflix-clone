import React, { Component } from 'react';
import ThumbnailIcon from './ThumbnailIcon';
import ThumbnailDescription from './ThumbnailDescription';
import VideoPlayButton from './VideoPlayButton';
import classNames from 'classnames';
class SlideVideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, showDescription: window.screen.width > 1024 };
    const { size, transitionTimeout } = props;

    this.defaultStyle = {
      width: size.width,
      height: size.height,
      transition: `opacity ${transitionTimeout}ms`,
      backgroundImage: null,
      backgroundSize: 'cover',
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.toggleDescription);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleDescription);
  }

  toggleDescription = () => {
    if (window.screen.width > 1024) {
      this.setState(prevState => ({ showDescription: true }));
    } else {
      this.setState(prevState => ({ showDescription: false }));
    }
  };

  dimPlayButton = () => {
    this.setState(prevState => ({ hover: !prevState.hover }));
  };

  componentDidUpdate() {
    if (!this.defaultStyle.backgroundImage) {
      this.defaultStyle.backgroundImage = `url(${this.props.thumbnail})`;
    }
  }

  render() {
    const { clickHandler, title, description, show } = this.props;
    const { showDescription } = this.state;
    const transitionStyle = { opacity: show ? 1 : 0 };
    return (
      <div
        className={classNames('z-5 absolute thumbnail', {
          'top-0 left-0': show,
          'abs-center': !show,
        })}
        style={{ ...this.defaultStyle, ...transitionStyle }}
      >
        <VideoPlayButton className={this.state.hover ? 'dim' : ''} clickHandler={clickHandler} />
        {showDescription && <ThumbnailDescription title={title} description={description} />}
        {showDescription && (
          <div
            className="absolute right-1 bottom-1"
            onMouseEnter={this.dimPlayButton}
            onMouseLeave={this.dimPlayButton}
          >
            <ThumbnailIcon className="mb2" icon="fa-thumbs-up" />
            <ThumbnailIcon className="mb2" icon="fa-thumbs-down" />
            <ThumbnailIcon />
          </div>
        )}
      </div>
    );
  }
}

export default SlideVideoThumbnail;
