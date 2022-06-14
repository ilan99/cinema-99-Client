import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditUserId, setDisplayBar, setClickAll } from "../redux/actions";
import { deleteUser, deleteUserPermissions } from "../utils/users";
import "../style.css";

function User(props) {
  const { _id: userId } = props.user;
  const {
    username,
    password,
    firstName,
    lastName,
    createDate,
    sessionTimeOut,
  } = props.user;
  const { permissions } = props.permissions;
  const [editDate, setEditDate] = useState();
  const [perSubsRepeater, setPerSubsRepeater] = useState();
  const [perMoviesRepeater, setPerMoviesRepeater] = useState();
  const { clickAll } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const arrDate = createDate.split("-");
    setEditDate(arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0]);

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
        return (
          <div key={index} style={{ display: "flex" }}>
            <label
              className="Label-Box"
              style={{
                display: "inline-block",
                backgroundColor: checked ? "lawnGreen" : "",
              }}
            ></label>{" "}
            {prefix}
          </div>
        );
      } else {
        return null;
      }
    });
    setPerSubsRepeater(repeaterSubs);

    const repeaterMovies = perList.map((permission, index) => {
      const arrPermission = permission.split(" ");
      const prefix = arrPermission[0];
      const suffix = arrPermission[1];
      if (suffix === "Movies") {
        const checked = permissions.includes(permission);
        return (
          <div key={index} style={{ display: "flex" }}>
            <label
              className="Label-Box"
              style={{
                display: "inline-block",
                backgroundColor: checked ? "lawnGreen" : "",
              }}
            ></label>{" "}
            {prefix}
          </div>
        );
      } else {
        return null;
      }
    });
    setPerMoviesRepeater(repeaterMovies);
  }, [createDate, permissions]);

  const edtUser = () => {
    dispatch(setEditUserId(userId));
    dispatch(setDisplayBar(false));
    navigate("/main/usersManagement/editUser");
  };

  const dltUser = async () => {
    // Users
    const { data } = await deleteUser(userId);
    alert(data);

    // Permissions
    await deleteUserPermissions(userId);

    // Redirect to - Users Management page
    dispatch(setClickAll(!clickAll));
    navigate("/main/usersManagement");
  };

  const isDisplay = () => {
    return username === "Admin" ? "none" : "initial";
  };

  return (
    <div className="User-Form">
      <h3
        style={{
          backgroundColor: "cyan",
          gridColumn: "span 2",
          marginTop: "0px",
          marginBottom: "15px",
        }}
      >
        {firstName} {lastName}
      </h3>
      User Name . . . . . :<div>{username}</div>
      Password . . . . . . .:<div>{password}</div>
      Session Time Out :<div>{sessionTimeOut} (Minutes)</div>
      Created Date . . . .:<div>{editDate}</div>
      Permissions . . . . .:
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
        <button onClick={edtUser}>Edit</button>{" "}
        <button onClick={dltUser} style={{ display: isDisplay() }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;
