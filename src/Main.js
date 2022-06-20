import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCrossFind, setClickAll, setSort } from "./redux/actions";
import Movies from "./movies/Movies";
import Subscriptions from "./subscriptions/Subscriptions";
import UsersManagement from "./usersManagement/UsersManagement";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Main() {
  const { validLogin, userName, clickAll, home } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const labelMovies = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!validLogin) {
      navigate("/");
    }
  });

  useEffect(() => {
    labelMovies.current.click();
  }, [home]);

  const handleClick = (e) => {
    dispatch(setClickAll(!clickAll));
    dispatch(setCrossFind(false));
    dispatch(setSort(""));

    const { htmlFor } = e.target;

    switch (htmlFor) {
      case "movies":
        navigate("./movies");
        break;
      case "subscriptions":
        navigate("./subscriptions");
        break;
      case "users":
        navigate("./usersManagement");
        break;

      default:
        break;
    }
  };

  const isDisplay = () => {
    return userName === "Admin" ? "initial" : "none";
  };

  return (
    <div style={{ height: "calc(100vh - 144px)" }}>
      <div style={{ backgroundColor: "lavender", borderBottom: "2px solid" }}>
        <br />
        <input type="radio" name="btnMain" id="movies" />
        <label htmlFor="movies" onClick={handleClick} ref={labelMovies}>
          Movies
        </label>
        &nbsp;&nbsp;
        <input type="radio" name="btnMain" id="subscriptions" />
        <label htmlFor="subscriptions" onClick={handleClick}>
          Subscriptions
        </label>
        &nbsp;&nbsp;
        <input type="radio" name="btnMain" id="users" />
        <label
          htmlFor="users"
          onClick={handleClick}
          style={{ display: isDisplay() }}
        >
          Users Management
        </label>
        <br /> <br />
      </div>
      <Routes>
        <Route path="/movies/*" element={<Movies />} />
        <Route path="/subscriptions/*" element={<Subscriptions />} />
        <Route path="/usersManagement/*" element={<UsersManagement />} />
      </Routes>
    </div>
  );
}

export default Main;
