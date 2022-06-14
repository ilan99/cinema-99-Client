import { useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCrossFind, setDisplayBar } from "../redux/actions";
import Users from "./Users";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import "../style.css";

function UsersManagement() {
  const { displayBar, clickAll } = useSelector((state) => state);
  const labelAllUsers = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    labelAllUsers.current.click();
  }, [clickAll]);

  const handleClick = (e) => {
    dispatch(setCrossFind(false));
    dispatch(setDisplayBar(true));

    const { htmlFor } = e.target;

    switch (htmlFor) {
      case "allUsers":
        navigate("./users");
        break;
      case "addUser":
        navigate("./addUser");
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ display: "initial" }}>
      <div className="Sub-Menu" style={{ display: displayBar ? "" : "none" }}>
        <input type="radio" name="btn" id="allUsers" />
        <label htmlFor="allUsers" onClick={handleClick} ref={labelAllUsers}>
          All Users
        </label>
        &nbsp;&nbsp;
        <input type="radio" name="btn" id="addUser" />
        <label htmlFor="addUser" onClick={handleClick}>
          Add User
        </label>
      </div>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="editUser" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default UsersManagement;
