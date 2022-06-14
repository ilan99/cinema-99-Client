import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setEditMemberId,
  setDisplayBar,
  setClickAll,
  setCrossFind,
} from "../redux/actions";
import { deleteMember } from "../utils/members";
import {
  addSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getAllSubscriptionsByRef,
} from "../utils/subscriptions";
import SubscribeToNewMovie from "./SubscribeToNewMovie";
import "../style.css";

function Member(props) {
  const { _id: memberId } = props.member;
  const { name, email, city } = props.member;
  const [subsRepeater, setSubsRepeater] = useState(null);
  const [newSubsToMovie, setNewSubsToMovie] = useState(false);
  const { permissions, subscriptionCounter, clickAll } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mount = true;

    async function getData() {
      const { data: subscriptions } = await getAllSubscriptionsByRef();

      const subscription = subscriptions.find(
        (subs) => subs.memberId._id === memberId
      );

      if (!subscription) {
        const newSubscription = { memberId };
        await addSubscription(newSubscription);
        return;
      }

      const repeater = subscription.movies.map((movie, index) => {
        const date_0 = movie.date.split("T")[0];
        const date_1 = date_0.split("-");
        const date = date_1[2] + "/" + date_1[1] + "/" + date_1[0];
        const { _id, name } = movie.movieId;
        const url = `/main/movies/allMovies/findById/${_id}`;
        return (
          <li key={index}>
            <Link
              to={url}
              onClick={() => {
                dispatch(setCrossFind(true));
              }}
            >
              {name}
            </Link>{" "}
            , {date}
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
  }, [memberId, subscriptionCounter, dispatch]);

  const getSubscriptionId = async () => {
    const { data: subscriptions } = await getAllSubscriptions();
    const subscription = subscriptions.find(
      (subs) => subs.memberId === memberId
    );
    return subscription._id;
  };

  const edtMember = () => {
    dispatch(setEditMemberId(memberId));
    dispatch(setDisplayBar(false));
    navigate("/main/subscriptions/editMember");
  };

  const dltMember = async () => {
    // Delete from members
    const { data } = await deleteMember(memberId);
    alert(data);

    // Delete from subscriptions
    const subscriptionId = await getSubscriptionId();
    await deleteSubscription(subscriptionId);

    // Redirect to - All Members page
    dispatch(setClickAll(!clickAll));
    navigate("/main/subscriptions");
  };

  const isDisplayCreate = () => {
    return permissions.includes("Create Subscriptions") ? "initial" : "none";
  };

  const isDisplayEdit = () => {
    return permissions.includes("Update Subscriptions") ? "initial" : "none";
  };

  const isDisplayDelete = () => {
    return permissions.includes("Delete Subscriptions") ? "initial" : "none";
  };

  return (
    <div className="Member">
      <h3 style={{ backgroundColor: "springGreen", margin: "0px" }}>{name}</h3>
      <br />
      <span style={{ fontWeight: "bold" }}>Email : </span>
      {email} <br />
      <span style={{ fontWeight: "bold" }}>City : </span>
      {city} <br />
      <br />
      <button onClick={edtMember} style={{ display: isDisplayEdit() }}>
        Edit
      </button>{" "}
      <button onClick={dltMember} style={{ display: isDisplayDelete() }}>
        Delete
      </button>
      <br />
      <br />
      <div className="Movies-Watched">
        <strong style={{ color: "fuchsia" }}>Movies Watched</strong>
        <br />
        <button
          onClick={() => setNewSubsToMovie(!newSubsToMovie)}
          style={{
            display: isDisplayCreate(),
            marginTop: "2px",
            backgroundColor: newSubsToMovie ? "lightYellow" : "",
          }}
        >
          Subscribe to new movie
        </button>
        <br />
        {newSubsToMovie ? <SubscribeToNewMovie memberId={memberId} /> : null}
        <ul>{subsRepeater}</ul>
      </div>
    </div>
  );
}

export default Member;
