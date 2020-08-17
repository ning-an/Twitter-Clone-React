import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { COLORS } from "../constants";

//avatar
export const Avatar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser && (
        <Image src={currentUser.avatarSrc} alt={currentUser.handle} />
      )}
    </div>
  );
};

export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0 0 1px 1px lightgrey;
`;

//display_name
export const DisplayName = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 10px;

  &:hover {
    border-bottom: solid ${COLORS.primary} 1px;
    color: ${COLORS.primary};
  }
`;

//Spans: handle, location, join
export const SpanInfo = styled.span`
  color: grey;
  font-size: 16px;
`;
