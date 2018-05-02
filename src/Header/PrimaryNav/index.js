import React, { Component } from 'react';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
const menuItems = ['home', 'movies', 'TV shows', 'originals', 'my list'];
class PrimaryNav extends Component {
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
    const menu =
      this.state.screenWidth >= 1024 ? (
        <DesktopMenu items={menuItems} />
      ) : (
        <MobileMenu items={menuItems} />
      );
    return (
      <ul className="pa0 pv1 flex items-center ma0 h-100 ml5-l ml3">
        <li className="f3-ns f4 fw5 dark-red list">NETFLEX</li>
        {menu}
      </ul>
    );
  }
}

export default PrimaryNav;
