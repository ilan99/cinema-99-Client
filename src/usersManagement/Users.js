import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "./User";
import { getAllUsers, getAllUsersPermissions } from "../utils/users";
import "../style.css";

function Users() {
  const [usersRepeater, setUsersRepeater] = useState();
  const { clickAll } = useSelector((state) => state);

  useEffect(() => {
    async function getData() {
      const { data: users } = await getAllUsers();
      const { data: usersPermissions } = await getAllUsersPermissions();

      const repeater = users.map((user, index) => {
        const permissions = usersPermissions.find(
          (permissions) => user._id === permissions.userId
        );

        return <User key={index} user={user} permissions={permissions} />;
      });

      setUsersRepeater(repeater);
    }

    getData();
  }, [clickAll]);

  return <div className="All-Users">{usersRepeater}</div>;
}

export default Users;
