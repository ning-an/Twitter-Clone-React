import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { followUser, unfollowUser } from "../helpers/apiHelpers";

export default function FollowBtn({ target }) {
  const handleFollow = (e) => {
    if (e.target.innerText === "Unfollow") {
      unfollowUser(target.handle);
    } else {
      followUser(target.handle);
    }
  };

  return (
    <Btn onClick={handleFollow}>
      {target.isBeingFollowedByYou ? "Unfollow" : "Follow"}
    </Btn>
  );
}

const Btn = styled.button`
  border-radius: 20px;
  background-color: ${COLORS.primary};
  color: ${COLORS.secondary};
  font-size: 18px;
  border: none;
  padding: 5px 20px;
  float: right;
  margin: 20px;
`;
