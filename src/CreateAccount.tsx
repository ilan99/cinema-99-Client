import { useState } from "react";
import { getUserByName, updateUser } from "./utils/users";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./style.css";

function CreateAccount() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const changeData = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!(username && password)) {
      alert("User name and Password are required");
      return;
    }

    const { data: user } = await getUserByName(username);
    if (user === null) {
      alert("User name does not exist");
      return;
    }

    if (user.password) {
      alert("User name already exist");
      return;
    }

    const { data } = await updateUser(user._id, { password });
    alert(data);

    navigate("/");
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "calc(100vh - 144px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ marginTop: "15vh" }}>
        <Typography variant="h5" fontWeight={"bold"} fontSize={"1.3rem"}>
          Create An Account
        </Typography>
        <form onSubmit={handleSubmit} className="Login-Form">
          <strong>User Name </strong>

          <input type="text" name="username" onChange={changeData} />

          <strong>Password </strong>
          <input type="password" name="password" onChange={changeData} />
          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" className="Login-Button">
              Create
            </button>
            &nbsp;
            <button type="button" className="Login-Button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
