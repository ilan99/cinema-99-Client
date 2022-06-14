import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEditPermission } from "../redux/actions";

function Permission(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(props.checked);
  const { index } = props;
  const { permission } = props;

  const handleClick = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    dispatch(setEditPermission(index, checked));
  };

  return (
    <div>
      <input type="checkbox" onChange={handleClick} checked={checked} />{" "}
      {permission}
    </div>
  );
}

export default Permission;
