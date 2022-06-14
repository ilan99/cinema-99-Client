import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../utils/movies";
import {
  getAllSubscriptionsByRef,
  updateSubscription,
} from "../utils/subscriptions";
import { increaseCounter } from "../redux/actions";
import "../style.css";

function SubscribeToNewMovie(props) {
  const [moviesRepeater, setMoviesRepeater] = useState();
  const [subscriptionId, setSubscriptionId] = useState();
  const [movieId, setMovieId] = useState("");
  const [dateWatched, setDateWatched] = useState("");
  const [subscriptionMovies, setSubscriptionMovies] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let mount = true;

    async function getData() {
      const { data: subscriptions } = await getAllSubscriptionsByRef();
      const { data: movies } = await getAllMovies();
      const { memberId } = props;

      const subscription = subscriptions.find(
        (subs) => subs.memberId._id === memberId
      );

      if (!subscription) {
        return;
      }

      if (mount) {
        setSubscriptionId(subscription._id);
        setSubscriptionMovies([...subscription.movies]);
      }

      const repeater = movies.map((movie, index) => {
        const movieWatched = subscription.movies.find(
          (subMovie) => subMovie.movieId._id === movie._id
        );

        if (!movieWatched) {
          return (
            <option key={index} value={movie._id}>
              {movie.name}
            </option>
          );
        } else {
          return null;
        }
      });

      if (mount) {
        setMoviesRepeater(repeater);
      }
    }

    setDateWatched("");
    getData();

    return function cleanup() {
      mount = false;
    };
  }, [props]);

  const subscribe = async () => {
    // Check input data
    if (!movieId) {
      alert("Movie name is required");
      return;
    }

    if (!dateWatched) {
      alert("Watch date is not valid");
      return;
    }

    // Subscribe
    const newSubscription = { movieId, date: dateWatched };
    const movies = [...subscriptionMovies, newSubscription];
    await updateSubscription(subscriptionId, { movies });
    alert("Subscribed successful");

    // Rerender component
    dispatch(increaseCounter());
  };

  return (
    <div className="Sub-To-Movie">
      <strong style={{ marginBottom: "10px", display: "block" }}>
        Add New Movie
      </strong>
      <select
        name="movie"
        onChange={(e) => setMovieId(e.target.value)}
        style={{ width: "130px", height: "22px" }}
      >
        <option value="" hidden>
          Select a movie...
        </option>
        {moviesRepeater}
      </select>{" "}
      <input
        type="date"
        name="dateWatched"
        value={dateWatched}
        style={{ width: "125px", height: "18px" }}
        onChange={(e) => setDateWatched(e.target.value)}
      />{" "}
      <br />
      <button onClick={subscribe} style={{ marginTop: "2px" }}>
        Subscribe
      </button>
    </div>
  );
}

export default SubscribeToNewMovie;
