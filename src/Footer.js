import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
  handleClick = () => {
    this.props.openDialog();
  };

  render() {
    return (
      <div className="Footer">
        <button onClick={this.handleClick} className="About-Button">
          About
        </button>
      </div>
    );
  }
}

export default Footer;
