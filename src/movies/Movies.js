import { useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDisplayFind,
  setCrossFind,
  setDisplayBar,
  setSort,
} from "../redux/actions";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import "../style.css";

function Movies() {
  const [find, setFind] = useState("");
  const { permissions, displayFind, displayBar, clickAll, crossFind } =
    useSelector((state) => state);
  const allowed = permissions.includes("View Movies");
  const labelAllMovies = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allowed) {
      alert("You have no permission to Movies category");
    }
  }, [allowed]);

  useEffect(() => {
    if (!crossFind) {
      labelAllMovies.current.click();
    }
  }, [clickAll, crossFind]);

  const handleClick = (e) => {
    dispatch(setCrossFind(false));
    dispatch(setDisplayBar(true));
    dispatch(setDisplayFind(true));

    const { htmlFor } = e.target;

    switch (htmlFor) {
      case "allMovies":
        setFind("");
        navigate("./allMovies");
        break;
      case "addMovie":
        dispatch(setDisplayFind(false));
        navigate("./addMovie");
        break;
      case "find":
        navigate(`./allMovies/findByName/${find}`);
        break;

      default:
        break;
    }
  };

  const isDisplayAdd = () => {
    return permissions.includes("Create Movies") ? "initial" : "none";
  };

  const isDisplayCategory = () => {
    return allowed ? "initial" : "none";
  };

  return (
    <div style={{ display: isDisplayCategory() }}>
      <div
        className="Sub-Menu"
        style={{ display: displayBar && !crossFind ? "" : "none" }}
      >
        <input type="radio" name="btn" id="allMovies" />
        <label htmlFor="allMovies" onClick={handleClick} ref={labelAllMovies}>
          All Movies
        </label>
        &nbsp;&nbsp;
        <input type="radio" name="btn" id="addMovie" />
        <label
          htmlFor="addMovie"
          onClick={handleClick}
          style={{ display: isDisplayAdd() }}
        >
          Add Movie
        </label>
        <div style={{ display: displayFind ? "contents" : "none" }}>
          <strong
            style={{
              fontFamily: "sans-serif",
              marginLeft: "80px",
              marginRight: "5px",
            }}
          >
            Find Movie{" "}
          </strong>
          <input
            type="text"
            name="find"
            value={find}
            onChange={(e) => {
              setFind(e.target.value);
            }}
            style={{ height: "18px" }}
          />{" "}
          <input type="radio" name="btn" id="find" />
          <label
            htmlFor="find"
            onClick={handleClick}
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            Find
          </label>
          <strong
            style={{
              fontFamily: "sans-serif",
              marginLeft: "80px",
              marginRight: "5px",
            }}
          >
            Sort by{" "}
          </strong>
          <select
            onChange={(e) => dispatch(setSort(e.target.value))}
            style={{ height: "24px" }}
          >
            <option value="" hidden></option>
            <option value="name">A-Z</option>
            <option value="premiered">premiered year</option>
          </select>
        </div>
      </div>
      <Routes>
        <Route path="/allMovies/:findMethod/:find" element={<AllMovies />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/editMovie" element={<EditMovie />} />
      </Routes>
    </div>
  );
}

export default Movies;
