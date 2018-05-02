import React, { Component } from 'react';
import IntroButton from './IntroButton';
const videoSrc =
  'https://www.youtube.com/embed/QwievZ1Tx-8?showinfo=0&rel=0&enablejsapi=1&autoplay=0&controls=0';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = { height: `${window.screen.availWidth * 0.5625}px` };
    this.videoElement = React.createRef();
    this.pause = false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateHeight);
    window.addEventListener('scroll', this.pauseVideo);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
    window.removeEventListener('scroll', this.pauseVideo);
  }

  updateHeight = () => {
    this.setState({ height: `${window.screen.width * 0.5625}px` });
  };

  pauseVideo = () => {
    if (!this.pause) {
      this.pause = true;
      let iframe = this.videoElement.current.contentWindow;
      iframe.postMessage(`{"event":"command","func":"pauseVideo" ,"args":""}`, '*');
      setTimeout(() => {
        this.pause = false;
      }, 1000);
    }
  };

  render() {
    const { height } = this.state;
    return (
      <div className="relative intro 100%" style={{ height: height }}>
        <iframe
          ref={this.videoElement}
          title="intro"
          width="100%"
          height={height}
          src={videoSrc}
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
        <div className="white absolute w-30 ml5-ns ml3 introTitle">
          <h1 className="ma0 f2-m f5 fw5 w-100">Avengers : Infinity War</h1>
          <IntroButton name="My List" icon="fa-plus" />
        </div>
      </div>
    );
  }
}

export default Intro;
