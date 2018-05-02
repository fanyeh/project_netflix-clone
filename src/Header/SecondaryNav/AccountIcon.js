import React, { Component } from 'react';
import classNames from 'classnames';
class AccountIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  hoverHandler = () => {
    this.setState(prevState => ({ hover: !prevState.hover }));
  };

  render() {
    const { color, className, kids, name, caret } = this.props;
    const { hover } = this.state;
    const fontStyle = kids ? 'f6 fw9 mid-gray' : 'f3 fw4 white rotate-90';
    return (
      <div
        className={classNames('flex items-center', className)}
        onMouseEnter={this.hoverHandler}
        onMouseLeave={this.hoverHandler}
      >
        <div
          className={classNames('tc tracked-tight ', fontStyle)}
          style={{
            width: '34px',
            height: '34px',
            backgroundColor: `${color}`,
            lineHeight: '34px',
          }}
        >
          {kids ? 'kids' : ': )'}
        </div>
        {name && <span className={classNames('ml2 fw3 ttc', { underline: hover })}>{name}</span>}
        {caret && <i className="fas fa-caret-down white v-mid f4 ml2" />}
      </div>
    );
  }
}

export default AccountIcon;
