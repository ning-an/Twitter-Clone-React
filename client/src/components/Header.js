import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Logo } from "../logo.svg";
import { Avatar } from "./PersonalInfo";
import { COLORS } from "../constants";

const Header = () => {
  const { status, currentUser } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <div>
        <Logo
          style={{
            filter:
              "invert(0.8) sepia(100%) saturate(76%) hue-rotate(16deg) brightness(118%) contrast(119%)",
            height: "50px",
            width: "50px",
            marginRight: "10px",
          }}
        />
        <h1>Critter</h1>
      </div>
      {status === "success" ? (
        <Link to={`/profile/${currentUser.handle}`}>
          <Avatar />
        </Link>
      ) : (
        "Sign In"
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: ${COLORS.primary};
  color: ${COLORS.secondary};
  padding-left: 10px;
  padding-right: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 24px;
  }

  img {
    height: 40px;
  }
`;

export default Header;
