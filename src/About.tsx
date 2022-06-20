import { Component } from "react";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

type AboutProps = {
  closeDialog: any;
};

class About extends Component<AboutProps> {
  handleClick = () => {
    this.props.closeDialog();
  };

  render() {
    return (
      <div style={{ width: "745px" }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <IconButton
            sx={{ p: 0 }}
            onClick={this.handleClick}
            disableRipple={true}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography
          variant="h4"
          style={{ color: "blue", textAlign: "center", marginBottom: "15px" }}
        >
          Welcome
        </Typography>

        <Typography fontSize={"1.1rem"} component="span">
          My name is
          <b style={{ color: "red", fontStyle: "italic" }}> Ilan Samara </b>,
          and I'm a Full-Stack Web Developer.
          <br />
          <br />I have graduated my Full-Stack studies from <b>
            KERNELIOS
          </b>{" "}
          college in 2021, and I'm glad to introduce you my final project.
          <br />
          <br />
          This web application provides a full management of movies, members and
          subscriptions.
          <br />
          <br />
          The system's users are managed by "Admin" user (the initial login),
          who's he only can grant CRUD permissions for each user.
          <br />
          <br />
          <b>
            <u> Website Architecture </u>
          </b>
          <ul style={{ paddingLeft: "1.2rem", marginBlockStart: "0.5em" }}>
            <li className="About-li">
              <u>Front-end</u> : Client based on React.js/ts, Material-UI, and
              REST-API using Axios.{" "}
              <a
                href="https://github.com/ilan99/cinema-999-Client"
                target="_blank"
                rel="noReferrer"
                style={{ color: "red", fontSize: "1rem" }}
              >
                (View code)
              </a>
            </li>
            <li className="About-li">
              <u>Back-end</u> : Two servers based on Node.js, and REST-API using
              Express. <br />
              &emsp; &emsp; &emsp; &ensp; &ensp;1-&nbsp;Middle server handles
              Client requests.{" "}
              <a
                href="https://github.com/ilan99/cinema-999-Server-1"
                target="_blank"
                rel="noReferrer"
                style={{ color: "red", fontSize: "1rem" }}
              >
                (View code)
              </a>
              <br />
              &emsp; &emsp; &emsp; &ensp; &ensp;2-&nbsp;End server handles
              Middle server requests.{" "}
              <a
                href="https://github.com/ilan99/cinema-999-Server-2"
                target="_blank"
                rel="noReferrer"
                style={{ color: "red", fontSize: "1rem" }}
              >
                (View code)
              </a>
            </li>
            <li className="About-li">
              <u>Database</u> : MongoDB server using Mongoose.
            </li>
          </ul>
        </Typography>
      </div>
    );
  }
}

export default About;
