import React, { Component } from 'react';
import AccountIcon from './AccountIcon';
import MenuItem from './MenuItem';
class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  hoverHandler = () => {
    this.setState(prevState => ({ hover: !prevState.hover }));
  };

  render() {
    const showCaret = window.screen.width >= 1024;
    const { hover } = this.state;
    const menuTransitionStyle = {
      visibility: hover ? 'visible' : 'hidden',
      opacity: hover ? 1 : 0,
      transition: 'opacity 200ms',
    };
    return (
      <div
        className="relative h-100 flex items-center"
        onMouseEnter={this.hoverHandler}
        onMouseLeave={this.hoverHandler}
      >
        <AccountIcon color="#0D7E80" className="ml4-l ml3 cp" caret={showCaret} />
        <div
          className="flex flex-column absolute top-2 z-5 white bg-black pv2 ba b--dark-gray dropdown"
          style={{ ...menuTransitionStyle }}
        >
          <ul className="bb pa0 pb2 ma0 b--dark-gray">
            <MenuItem>
              <AccountIcon color="#D2540D" name="Jane" />
            </MenuItem>
            <MenuItem>
              <AccountIcon color="white" kids name="Kids" />
            </MenuItem>
            <MenuItem underlineHover>Manage Profiles</MenuItem>
          </ul>

          <ul className="pa0 ma0 pt2">
            <MenuItem underlineHover>Account</MenuItem>
            <MenuItem underlineHover>Help Center</MenuItem>
            <MenuItem underlineHover>Sign out of Netflex</MenuItem>
          </ul>
        </div>
      </div>
    );
  }
}

export default DropDownMenu;
