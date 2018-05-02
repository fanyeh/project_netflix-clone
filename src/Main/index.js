import React, { Component } from 'react';
import Slider from './Slider';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: window.screen.width * 0.5625 * -0.25 };
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateOffset);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateOffset);
  }

  updateOffset = () => {
    this.setState({ offset: window.screen.width * 0.5625 * -0.25 });
  };

  render() {
    const { sliders } = this.props;
    const lastIndex = sliders.length - 1;
    return (
      <div
        className="w-100 overflow-hidden"
        style={{ transform: `translateY(${this.state.offset}px)` }}
      >
        {sliders.map((slider, index) => (
          <Slider
            title={slider.title}
            sliderData={slider.data}
            key={slider.category}
            last={index === lastIndex}
            className={index === 0 ? 'mt5' : ''}
          />
        ))}
      </div>
    );
  }
}

export default Main;
