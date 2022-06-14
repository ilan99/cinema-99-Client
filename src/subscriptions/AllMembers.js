import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Member from "./Member";
import { getAllMembers } from "../utils/members";
import "../style.css";

function AllMembers() {
  const [membersRepeater, setMembersRepeater] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const { data: members } = await getAllMembers();

      const { memberId } = params;
      const repeater = members.map((member, index) => {
        if (!memberId || memberId === member._id) {
          return <Member key={index} member={member} />;
        } else {
          return null;
        }
      });

      setMembersRepeater(repeater);
    }

    getData();
  }, [params]);

  return <div className="All-Members">{membersRepeater}</div>;
}

export default AllMembers;
