import React, { Component } from 'react';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';
import classNames from 'classnames';
class Header extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = { show: false, border: false, darkBackground: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.changeBackground);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeBackground);
  }

  /* Header bg opacity change when scrolling */
  changeBackground = () => {
    const { darkBackground } = this.state;
    const scrollY = window.scrollY;
    if (scrollY >= 70 && !darkBackground) {
      this.setState({ darkBackground: true });
    } else if (scrollY < 70 && darkBackground) {
      this.setState({ darkBackground: false });
    }
  };

  showInput = () => {
    if (this.state.border) {
      this.setState(prevState => ({ show: !prevState.show }));
    } else {
      this.inputElement.current.focus();
      this.setState(prevState => ({ show: !prevState.show, border: true }));
    }
  };

  transitionEndHandler = () => {
    if (!this.state.show) {
      this.setState({ border: false });
    }
  };

  render() {
    const { show, border, darkBackground } = this.state;
    const bgColor = darkBackground ? 'bg-black' : 'bg-black-70';
    return (
      <header
        className={classNames('fixed z-5 w-100 absolute', bgColor)}
        style={{ transition: `background-color 200ms` }}
      >
        <nav className="relative nav">
          <PrimaryNav />
          <SecondaryNav
            clickHandler={this.showInput}
            show={show}
            border={border}
            transitionEndHandler={this.transitionEndHandler}
            elementRef={this.inputElement}
          />
        </nav>
      </header>
    );
  }
}

export default Header;
