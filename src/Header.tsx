import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setValidLogin } from "./redux/actions";
import {Typography} from "@mui/material"
import "./style.css";

type HeaderProps = {
  logOut: any;
  validLogin: boolean;
  firstName: string;
  lastName: string;
}

class Header extends Component<HeaderProps> {
  
  logOut = () => {
    this.props.logOut();
  };

  render() {
    const user = this.props.validLogin ? (
      <div style={{ float: "right", fontSize: "large" }}>
        Hello :{" "}
        <strong style={{ color: "red" }}>
          {this.props.firstName} {this.props.lastName}
        </strong>
        <Link to="/">
          <button
            onClick={this.logOut}
            className="Login-Button"
            style={{ height: "19px", marginLeft: "20px" }}
          >
            Log Out
          </button>
        </Link>
      </div>
    ) : null;

    return (
      <div className="Header">
        {/* <h1>Movies - Subscriptions Web Site</h1> */}
        <Typography variant="h4" mt={"9px"} mb={"29px"}>Movies - Subscriptions Web Site</Typography>
        {user}
      </div>
    );
  }
}

const dispatchToState = (state:any) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    validLogin: state.validLogin,
  };
};

const dispatchToProps = (dispatch:any) => {
  return {
    logOut: () => {
      dispatch(setValidLogin(false));
    },
  };
};

export default connect(dispatchToState, dispatchToProps)(Header);
