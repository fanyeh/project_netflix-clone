import React, { Component } from 'react';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';
class Header extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = { show: false, border: false };
  }

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

  /* TODO bg color opacity and when scroll update to solid black */
  render() {
    const { show, border } = this.state;
    return (
      <header className="fixed z-5 w-100 bg-black absolute">
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
