import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClickAll } from "../redux/actions";
import { addMember } from "../utils/members";
import "../style.css";

function AddMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clickAll } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "city":
        setCity(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check input data
    if (!name) {
      alert("Member's name is required");
      return;
    }

    // Members - DB
    const member = { name, email, city };
    const { data } = await addMember(member);
    if (typeof data === "string") {
      alert(data);
    } else {
      alert(data.message);
      return;
    }

    // Redirect to - All Members page
    dispatch(setClickAll(!clickAll));
    navigate("/main/subscriptions");
  };

  const cancel = () => {
    dispatch(setClickAll(!clickAll));
    navigate("/main/subscriptions");
  };

  return (
    <div>
      <h3>Add New Member</h3>
      <form onSubmit={handleSubmit} className="Member-Form">
        Name :
        <input type="text" name="name" value={name} onChange={handleChange} />
        Email :
        <input type="text" name="email" value={email} onChange={handleChange} />
        City :
        <input type="text" name="city" value={city} onChange={handleChange} />
        &nbsp;
        <div style={{ gridColumn: "span 2" }}>
          <button type="submit">Save</button>{" "}
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
