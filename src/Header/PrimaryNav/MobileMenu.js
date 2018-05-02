import React, { Component } from 'react';

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  clickHandler = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  };
  render() {
    const { show } = this.state;
    const { items } = this.props;
    const menuTransitionStyle = {
      visibility: show ? 'visible' : 'hidden',
      opacity: show ? 1 : 0,
      transition: 'opacity 200ms',
    };
    return (
      <div className="relative ml3 f6-m f7 white">
        <div onClick={this.clickHandler} className="cp">
          <span className="dib v-mid" style={{ lineHeight: '21px' }}>
            Browse
          </span>
          <i className="fas fa-caret-down v-mid f4 ml2" />
        </div>

        <div
          className="absolute bg-black-80 tc tracked fw1 menuMobile"
          style={{ ...menuTransitionStyle }}
        >
          {items.map(item => (
            <li className="list cp pv2 ttc" key={item}>
              {item}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default MobileMenu;
