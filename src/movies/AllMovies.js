import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Movie from "./Movie";
import { getAllMovies } from "../utils/movies";
import "../style.css";

function AllMovies() {
  const [moviesRepeater, setMoviesRepeater] = useState();
  const { sort } = useSelector((state) => state);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const { data: movies } = await getAllMovies();
      const { findMethod, find } = params;
      let repeater;

      switch (sort) {
        case "name":
          movies.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;

        case "premiered":
          movies.sort((a, b) => {
            if (a.premiered < b.premiered) {
              return -1;
            }
            if (a.premiered > b.premiered) {
              return 1;
            }
            return 0;
          });
          break;

        default:
          break;
      }

      switch (findMethod) {
        case "findById":
          repeater = movies.map((movie, index) => {
            if (movie._id === find) {
              return <Movie key={index} movie={movie} />;
            } else {
              return null;
            }
          });
          break;

        case "findByName":
          repeater = movies.map((movie, index) => {
            if (movie.name.search(find) >= 0) {
              return <Movie key={index} movie={movie} />;
            } else {
              return null;
            }
          });
          break;

        default:
          repeater = movies.map((movie, index) => {
            return <Movie key={index} movie={movie} />;
          });
          break;
      }

      setMoviesRepeater(repeater);
    }

    getData();
  }, [params, sort]);

  return <div className="All-Movies">{moviesRepeater}</div>;
}

export default AllMovies;
