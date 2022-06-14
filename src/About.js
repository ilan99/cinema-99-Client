import React, { Component } from "react";
import "./style.css";

class About extends Component {
  handleClick = () => {
    this.props.closeDialog();
  };

  render() {
    return (
      <div style={{ fontSize: "1.3rem" }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button className="Close-Button" onClick={this.handleClick}>
            X
          </button>
        </div>
        <h1 style={{ color: "blue", textAlign: "center", marginTop: "0" }}>
          Welcome
        </h1>

        <div>
          <p>
            My name is
            <b style={{ color: "red", fontStyle: "italic" }}> Ilan Samara </b>,
            and I'm a Full-Stack Web Developer.
          </p>
          <br />
          <p>
            I have graduated my Full-Stack studies from <b>Kernelios</b> college
            in 2021,
            <br />
            and I'm glad to introduce you my final project.
          </p>
          <br />
          <p>
            This web application provides a full management of movies, members
            <br /> and subscriptions.
          </p>
          <br />
          <p>
            The system's users are managed by "Admin" user (the initial login),
            <br />
            who's he only can grant CRUD permissions for each user.
          </p>
          <br />
          <b>
            <u> Website Architecture </u>
          </b>
          <ul style={{ paddingLeft: "1.2rem", marginBlockStart: "0.5em" }}>
            <li className="About-li">
              <p>
                <span style={{ textDecoration: "underline" }}>Front-end</span> :
                Client based on React.js, and REST-API using Axios.{" "}
                <a
                  href="https://github.com/ilan99/cinema-999-Client"
                  target="_blank"
                  rel="noReferrer"
                  style={{ color: "red", fontSize: "1rem" }}
                >
                  (View code)
                </a>
              </p>
            </li>
            <li className="About-li">
              <p>
                <span style={{ textDecoration: "underline" }}>Back-end</span> :
                Two servers based on Node.js, and REST-API using Express. <br />
                &emsp; &emsp; &emsp; &ensp; 1-&nbsp;Middle server handles Client
                requests.{" "}
                <a
                  href="https://github.com/ilan99/cinema-999-Server-1"
                  target="_blank"
                  rel="noReferrer"
                  style={{ color: "red", fontSize: "1rem" }}
                >
                  (View code)
                </a>
                <br />
                &emsp; &emsp; &emsp; &ensp; 2-&nbsp;End server handles Middle
                server requests.{" "}
                <a
                  href="https://github.com/ilan99/cinema-999-Server-2"
                  target="_blank"
                  rel="noReferrer"
                  style={{ color: "red", fontSize: "1rem" }}
                >
                  (View code)
                </a>
              </p>
            </li>
            <li>
              <p>
                <span style={{ textDecoration: "underline" }}>Database</span> :
                MongoDB server using Mongoose, and local JSON files.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default About;
