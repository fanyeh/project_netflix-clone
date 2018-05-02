import React, { Component } from 'react';
import SearchField from './SearchField';
import DropDownMenu from './DropDownMenu';
class SecondaryNav extends Component {
  constructor(props) {
    super(props);
    this.state = { screenWidth: window.screen.width };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateScreenWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenWidth);
  }

  updateScreenWidth = () => {
    this.setState({ screenWidth: window.screen.width });
  };

  render() {
    const { screenWidth } = this.state;
    const showSearch = screenWidth >= 768;
    const showKid = screenWidth >= 1280;
    return (
      <div className="flex items-center v-center right-2-l right-1 pr3-l pr0 h-100 white">
        {showSearch && <SearchField {...this.props} />}
        {showKid && <span className=" pl3 pr4">Kid</span>}
        <i className="fas fa-bell f4  v-mid relative" />
        <DropDownMenu />
      </div>
    );
  }
}

export default SecondaryNav;
