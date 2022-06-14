import { useRef, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCrossFind, setDisplayBar } from "../redux/actions";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import "../style.css";

function Subscriptions() {
  const { permissions, displayBar, clickAll, crossFind } = useSelector(
    (state) => state
  );
  const allowed = permissions.includes("View Subscriptions");
  const labelAllMembers = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allowed) {
      alert("You have no permission to Subscriptions category");
    }
  }, [allowed]);

  useEffect(() => {
    if (!crossFind) {
      labelAllMembers.current.click();
    }
  }, [clickAll, crossFind]);

  const handleClick = (e) => {
    dispatch(setCrossFind(false));
    dispatch(setDisplayBar(true));

    const { htmlFor } = e.target;

    switch (htmlFor) {
      case "allMembers":
        navigate("./allMembers");
        break;
      case "addMember":
        navigate("./addMember");
        break;

      default:
        break;
    }
  };

  const isDisplayAdd = () => {
    return permissions.includes("Create Subscriptions") ? "initial" : "none";
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
        <input type="radio" name="btn" id="allMembers" />
        <label htmlFor="allMembers" onClick={handleClick} ref={labelAllMembers}>
          All Members
        </label>
        &nbsp;&nbsp;
        <input type="radio" name="btn" id="addMember" />
        <label
          htmlFor="addMember"
          onClick={handleClick}
          style={{ display: isDisplayAdd() }}
        >
          Add Member
        </label>
      </div>

      <Routes>
        <Route path="/allMembers/:memberId" element={<AllMembers />} />
        <Route path="/allMembers" element={<AllMembers />} />
        <Route path="/addMember" element={<AddMember />} />
        <Route path="/editMember" element={<EditMember />} />
      </Routes>
    </div>
  );
}

export default Subscriptions;
