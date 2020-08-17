import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { AiOutlineHome } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { BsPerson } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { ReactComponent as Logo } from "../logo.svg";
import { COLORS } from "../constants";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <IconContext.Provider value={{ style }}>
        <ul>
          <Logo
            style={{
              height: "60px",
              marginLeft: "18px",
              filter:
                "invert(0.2) sepia(100%) saturate(76%) hue-rotate(466deg) brightness(118%) contrast(119%)",
            }}
          />
          <Logo
            style={{
              height: "60px",
              transform: "scaleX(-1)",
              filter:
                "invert(0.2) sepia(100%) saturate(76%) hue-rotate(306deg) brightness(118%) contrast(119%)",
            }}
          />
          <li>
            <NavLink exact to="/" activeClassName="selected">
              <AiOutlineHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={currentUser ? `/profile/${currentUser.handle}` : ""}
              activeClassName="selected"
            >
              <BsPerson />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" activeClassName="selected">
              <RiNotification3Line />
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks" activeClassName="selected">
              <BsBookmarks />
              Bookmarks
            </NavLink>
          </li>
        </ul>
      </IconContext.Provider>
    </Wrapper>
  );
};

const style = {
  marginRight: "30px",
  verticalAlign: "top",
};

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 260px;
  margin-top: 20px;
  color: black;

  ul {
    padding: 10px;
  }

  .selected {
    background-color: ${COLORS.primary};
    color: ${COLORS.secondary} !important;
    border-radius: 30px;
    opacity: 0.5;
  }

  li {
    margin-top: 20px;
  }

  a {
    font-size: 24px;
    padding: 5px 15px;
  }
`;
export default Sidebar;
