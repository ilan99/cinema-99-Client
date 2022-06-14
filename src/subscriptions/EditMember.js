import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClickAll } from "../redux/actions";
import { getMemberById, updateMember } from "../utils/members";
import "../style.css";

function EditMember() {
  const { editMemberId: memberId, clickAll } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [titleName, setTitleName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function getData() {
      const { data: member } = await getMemberById(memberId);
      const { name, email, city } = member;
      setName(name);
      setTitleName(name);
      setEmail(email);
      setCity(city);
    }

    getData();
  }, [memberId]);

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
    const { data } = await updateMember(memberId, member);
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
      <h3>
        Edit Member : <span style={{ color: "blue" }}>{titleName}</span>
      </h3>
      <form onSubmit={handleSubmit} className="Member-Form">
        Name :
        <input type="text" name="name" value={name} onChange={handleChange} />
        Email :
        <input type="text" name="email" value={email} onChange={handleChange} />
        City :
        <input type="text" name="city" value={city} onChange={handleChange} />
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

export default EditMember;
