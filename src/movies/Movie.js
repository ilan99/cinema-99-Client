import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setEditMovieId,
  setDisplayBar,
  setClickAll,
  setCrossFind,
} from "../redux/actions";
import { deleteMovie } from "../utils/movies";
import {
  getAllSubscriptions,
  getAllSubscriptionsByRef,
  updateSubscription,
} from "../utils/subscriptions";
import "../style.css";

function Movie(props) {
  const { _id: movieId } = props.movie;
  const { name, genres, image, premiered } = props.movie;
  const [premieredYear, setPremieredYear] = useState();
  const [editGenres, setEditGenres] = useState();
  const [subsRepeater, setSubsRepeater] = useState();
  const { permissions, clickAll } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mount = true;
    const arrDate = premiered.split("-");
    setPremieredYear(arrDate[0]);

    setEditGenres(genres.map((genre) => genre + ", "));

    async function getData() {
      const { data: subscriptions } = await getAllSubscriptionsByRef();

      let arrSubs = [];
      subscriptions.forEach((subs) => {
        subs.movies
          .filter((movie) => movie.movieId._id === movieId)
          .forEach((movie) => {
            const date_0 = movie.date.split("T")[0];
            const date_1 = date_0.split("-");
            const date = date_1[2] + "/" + date_1[1] + "/" + date_1[0];
            const { _id, name } = subs.memberId;
            const subsWatched = { _id, name, date };
            arrSubs.push(subsWatched);
          });
      });

      const repeater = arrSubs.map((subs, index) => {
        const url = `/main/subscriptions/AllMembers/${subs._id}`;
        return (
          <li key={index}>
            <Link
              to={url}
              onClick={() => {
                dispatch(setCrossFind(true));
              }}
            >
              {subs.name}
            </Link>{" "}
            , {subs.date}
          </li>
        );
      });

      if (mount) {
        setSubsRepeater(repeater);
      }
    }
    getData();

    return function cleanup() {
      mount = false;
    };
  }, [premiered, genres, movieId, dispatch]);

  const edtMovie = () => {
    dispatch(setEditMovieId(movieId));
    dispatch(setDisplayBar(false));
    navigate("/main/movies/editMovie");
  };

  const dltMovie = async () => {
    // Delete from movies
    const { data } = await deleteMovie(movieId);
    alert(data);

    // Delete from subscriptions
    const { data: subscriptions } = await getAllSubscriptions();

    subscriptions.forEach(async (subs) => {
      const { _id: id } = subs;
      const subsObj = {
        ...subs,
        movies: subs.movies.filter((movie) => movie.movieId !== movieId),
      };
      await updateSubscription(id, subsObj);
    });

    // Redirect to - All Movies page
    dispatch(setClickAll(!clickAll));
    navigate("/main/movies");
  };

  const isDisplayEdit = () => {
    return permissions.includes("Update Movies") ? "initial" : "none";
  };

  const isDisplayDelete = () => {
    return permissions.includes("Delete Movies") ? "initial" : "none";
  };

  return (
    <div>
      <div className="Movie">
        <strong style={{ color: "blue" }}>
          {name} <span>(</span>
          {premieredYear}
          <span>)</span>
        </strong>
        <table>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "text-top", width: "55px" }}>
                <strong>genres :</strong>
              </td>
              <td>{editGenres}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  src={image}
                  alt="IMG"
                  style={{ width: "70px", height: "100px" }}
                />
              </td>
              <td
                style={{
                  verticalAlign: "text-top",
                  width: "230px",
                  height: "96px",
                  border: "3px solid",
                }}
              >
                <strong>Subscriptions Watched</strong>
                <ul
                  style={{
                    paddingInlineStart: "20px",
                    maxHeight: "74px",
                    overflow: "hidden",
                    overflowY: "auto",
                    marginBlockStart: "0.1em",
                    marginBlockEnd: "0.1em",
                  }}
                >
                  {subsRepeater}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div style={{ margin: "2px" }}>
          <button onClick={edtMovie} style={{ display: isDisplayEdit() }}>
            Edit
          </button>{" "}
          <button onClick={dltMovie} style={{ display: isDisplayDelete() }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;
