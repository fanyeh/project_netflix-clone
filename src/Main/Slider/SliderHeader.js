import React, { Component } from 'react';

class SliderHeader extends Component {
  render() {
    const { title, marginLeft } = this.props;
    return (
      <h1
        className="f3-l f4-m f5 light-gray ma0 mb2 fw4 ttc tracked"
        style={{ marginLeft: `${marginLeft}px` }}
      >
        {title}
      </h1>
    );
  }
}

export default SliderHeader;
