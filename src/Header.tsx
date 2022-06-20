import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setValidLogin, setHome } from "./redux/actions";
import { Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./style.css";

type HeaderProps = {
  logOut: Function;
  goHome: Function;
  validLogin: boolean;
  home: boolean;
  firstName: string;
  lastName: string;
};

class Header extends Component<HeaderProps> {
  logOut = () => {
    this.props.logOut();
  };

  goHome = () => {
    this.props.goHome(!this.props.home);
  };

  render() {
    const user = this.props.validLogin ? (
      <div>
        <Link to="/main">
          <IconButton sx={{ p: 0 }} onClick={this.goHome}>
            <HomeOutlinedIcon fontSize="large" />
          </IconButton>
        </Link>
        <div style={{ float: "right", fontSize: "large", marginTop: "10px" }}>
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
      </div>
    ) : null;

    return (
      <div className="Header">
        <Typography variant="h4" mt={"9px"} mb={"19px"}>
          Movies - Subscriptions Web Site
        </Typography>
        {user}
      </div>
    );
  }
}

const dispatchToState = (state: any) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    validLogin: state.validLogin,
    home: state.home,
  };
};

const dispatchToProps = (dispatch: any) => {
  return {
    logOut: () => {
      dispatch(setValidLogin(false));
    },
    goHome: (home: boolean) => {
      dispatch(setHome(home));
    },
  };
};

export default connect(dispatchToState, dispatchToProps)(Header);
