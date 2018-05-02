import React, { Component } from 'react';
import Slider from './Slider';

class Main extends Component {
  render() {
    const offset = window.screen.width * 0.5625 * -0.25;
    const { sliders } = this.props;
    const lastIndex = sliders.length - 1;
    return (
      <div className="w-100 overflow-hidden" style={{ transform: `translateY(${offset}px)` }}>
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
