import React, { Component } from 'react';

class DesktopMenu extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="flex white tracked f6 fw1">
        {items.map(item => (
          <li className="list ml4 cp dim ttc" key={item}>
            {item}
          </li>
        ))}
      </div>
    );
  }
}

export default DesktopMenu;
