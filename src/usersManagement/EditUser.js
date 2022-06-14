import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUserPermissions,
  setInitPermissionsList,
  setEditPermissionsList,
  setClickAll,
} from "../redux/actions";
import {
  getUserById,
  getUserByName,
  getUserPermissions,
  updateUser,
  updateUserPermissions,
} from "../utils/users";
import Permission from "./Permission";
import "../style.css";

function EditUser() {
  const {
    editUserId: userId,
    userName: userLogin,
    editPermissions,
    clickAll,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [titleFirstName, setTitleFirstName] = useState();
  const [titleLastName, setTitleLastName] = useState();
  const [titleUserName, setTitleUserName] = useState();
  const [sessionTimeOut, setSessionTimeOut] = useState("");
  const [createDate, setCreateDate] = useState();
  const [perSubsRepeater, setPerSubsRepeater] = useState();
  const [perMoviesRepeater, setPerMoviesRepeater] = useState();

  useEffect(() => {
    async function getData() {
      const { data: user } = await getUserById(userId);
      const { data: permissions } = await getUserPermissions(userId);

      const {
        username: userName,
        password,
        firstName,
        lastName,
        sessionTimeOut,
        createDate,
      } = user;

      setFirstName(firstName);
      setLastName(lastName);
      setUserName(userName);
      setPassword(password);
      setTitleFirstName(firstName);
      setTitleLastName(lastName);
      setTitleUserName(userName);
      setSessionTimeOut(sessionTimeOut);
      setCreateDate(createDate);

      dispatch(setInitPermissionsList());
      const perList = [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movies",
      ];

      // Subscriptions repeater
      const repeaterSubs = perList.map((permission, index) => {
        const arrPermission = permission.split(" ");
        const prefix = arrPermission[0];
        const suffix = arrPermission[1];
        if (suffix === "Subscriptions") {
          const checked = permissions.includes(permission);
          dispatch(setEditPermissionsList(permission, checked));
          return (
            <Permission
              key={index}
              index={index}
              permission={prefix}
              checked={checked}
            />
          );
        } else {
          return null;
        }
      });
      setPerSubsRepeater(repeaterSubs);

      // Movies repeater
      const repeaterMovies = perList.map((permission, index) => {
        const arrPermission = permission.split(" ");
        const prefix = arrPermission[0];
        const suffix = arrPermission[1];
        if (suffix === "Movies") {
          const checked = permissions.includes(permission);
          dispatch(setEditPermissionsList(permission, checked));
          return (
            <Permission
              key={index}
              index={index}
              permission={prefix}
              checked={checked}
            />
          );
        } else {
          return null;
        }
      });
      setPerMoviesRepeater(repeaterMovies);
    }

    getData();
  }, [userId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "sessionTimeOut":
        setSessionTimeOut(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check input data
    if (!(firstName && lastName && userName)) {
      alert("All user's names are required");
      return;
    }

    const { data: user } = await getUserByName(userName);
    if (user !== null && userName !== titleUserName) {
      alert("User name already exist");
      return;
    }

    if (!sessionTimeOut) {
      alert("Session Time Out is not valid");
      return;
    }

    // Users
    const changeUser = {
      username: userName,
      password,
      firstName,
      lastName,
      createDate,
      sessionTimeOut,
    };

    const { data } = await updateUser(userId, changeUser);
    alert(data);

    // Permissions
    const permissions = editPermissions
      .filter((permission) => permission.checked)
      .map((permission) => permission.permission);

    await updateUserPermissions(userId, { permissions });
    if (isAdmin()) {
      dispatch(setUserPermissions(permissions));
    }

    // Redirect to - Users page
    dispatch(setClickAll(!clickAll));
    navigate("/main/usersManagement/users");
  };

  const cancel = () => {
    dispatch(setClickAll(!clickAll));
    navigate("/main/usersManagement/users");
  };

  const isAdmin = () => {
    return userLogin === "Admin" ? true : false;
  };

  return (
    <div>
      <h3>
        Edit User :{" "}
        <span style={{ color: "blue" }}>
          {titleFirstName} {titleLastName}
        </span>
      </h3>
      <form
        onSubmit={handleSubmit}
        className="User-Form"
        style={{ width: "375px", borderWidth: "4px" }}
      >
        First Name :
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        Last Name :
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        User Name :
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
        />
        Password :
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
        Session Time Out :
        <div>
          <input
            type="number"
            name="sessionTimeOut"
            min="1"
            value={sessionTimeOut}
            onChange={handleChange}
            style={{ width: "70px" }}
          />{" "}
          (Minutes)
        </div>
        Permissions :
        <div style={{ display: "flex", gap: "15px" }}>
          <div>
            <span style={{ textDecoration: "underline" }}>Movies</span>
            <br />
            {perMoviesRepeater}
          </div>
          <div>
            <span style={{ textDecoration: "underline" }}>Subscriptions</span>
            <br />
            {perSubsRepeater}
          </div>
        </div>
        &nbsp;
        <div style={{ gridColumn: "span 2" }}>
          <button type="submit">Update</button>{" "}
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
