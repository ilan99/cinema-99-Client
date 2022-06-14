import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setInitPermissionsList,
  setEditPermissionsList,
  setClickAll,
} from "../redux/actions";
import { getUserByName, addUser, addUserPermissions } from "../utils/users";
import Permission from "./Permission";
import "../style.css";

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editPermissions, clickAll } = useSelector((state) => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const [sessionTimeOut, setSessionTimeOut] = useState("");
  const [createDate, setCreateDate] = useState();
  const [perSubsRepeater, setPerSubsRepeater] = useState();
  const [perMoviesRepeater, setPerMoviesRepeater] = useState();

  useEffect(() => {
    const date = new Date();
    setCreateDate(date.toISOString().split("T")[0]);

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
        dispatch(setEditPermissionsList(permission, false));
        return (
          <Permission
            key={index}
            index={index}
            permission={prefix}
            checked={false}
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
        dispatch(setEditPermissionsList(permission, false));
        return (
          <Permission
            key={index}
            index={index}
            permission={prefix}
            checked={false}
          />
        );
      } else {
        return null;
      }
    });
    setPerMoviesRepeater(repeaterMovies);
  }, [dispatch]);

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
    if (user !== null) {
      alert("User name already exist");
      return;
    }

    if (!sessionTimeOut) {
      alert("Session Time Out is not valid");
      return;
    }

    // Users
    const newUser = {
      username: userName,
      password: "",
      firstName,
      lastName,
      createDate,
      sessionTimeOut,
    };

    const { data: dataDB } = await addUser(newUser);
    alert(dataDB);

    const { data } = await getUserByName(userName);
    const { _id: userId } = data;

    // Permissions
    const permissions = editPermissions
      .filter((permission) => permission.checked)
      .map((permission) => permission.permission);

    const userPermissions = {
      userId: userId,
      permissions,
    };
    await addUserPermissions(userPermissions);

    // Redirect to - Users Management page
    dispatch(setClickAll(!clickAll));
    navigate("/main/usersManagement");
  };

  const cancel = () => {
    dispatch(setClickAll(!clickAll));
    navigate("/main/usersManagement");
  };

  return (
    <div>
      <h3>Add New User</h3>
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
            <span style={{ textDecoration: "underline" }}>Subscriptions</span>
            <br />
            {perSubsRepeater}
          </div>
          <div>
            <span style={{ textDecoration: "underline" }}>Movies</span>
            <br />
            {perMoviesRepeater}
          </div>
        </div>
        &nbsp;
        <div style={{ gridColumn: "span 2" }}>
          <button type="submit">Save</button>{" "}
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
