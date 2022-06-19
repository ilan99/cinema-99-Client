import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { setClickAll } from "../redux/actions";
import { getMovieById, updateMovie } from "../utils/movies";
import "../style.css";

function EditMovie() {
  const { editMovieId: movieId, clickAll } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [titleName, setTitleName] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState("");

  useEffect(() => {
    async function getData() {
      const { data: movie } = await getMovieById(movieId);
      const { name, genres, image, premiered } = movie;
      setName(name);
      setTitleName(name);
      setGenres(genres.join());
      setImage(image);
      setPremiered(premiered.split("T")[0]);
    }

    getData();
  }, [movieId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "genres":
        setGenres(value);
        break;
      case "image":
        setImage(value);
        break;
      case "premiered":
        setPremiered(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check input data
    if (!name) {
      alert("Movie's name is required");
      return;
    }

    // Movies - DB
    const arrGenres = genres.split(",");
    const movie = { name, genres: arrGenres, image, premiered };
    const { data } = await updateMovie(movieId, movie);
    if (typeof data === "string") {
      alert(data);
    } else {
      alert(data.message);
      return;
    }

    // Redirect to - Movies page
    dispatch(setClickAll(!clickAll));
    navigate("/main/movies");
  };

  const cancel = () => {
    dispatch(setClickAll(!clickAll));
    navigate("/main/movies");
  };

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        fontSize={"1.1rem"}
        mt="15px"
        mb="15px"
      >
        Edit Movie : <span style={{ color: "blue" }}>{titleName}</span>
      </Typography>
      <form onSubmit={handleSubmit} className="Movie-Form">
        Name :
        <input type="text" name="name" value={name} onChange={handleChange} />
        Genres :
        <input
          type="text"
          name="genres"
          value={genres}
          onChange={handleChange}
        />
        Image URL :
        <input type="text" name="image" value={image} onChange={handleChange} />
        Premiered :
        <input
          type="date"
          name="premiered"
          value={premiered}
          onChange={handleChange}
          style={{ width: "110px" }}
        />
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

export default EditMovie;
