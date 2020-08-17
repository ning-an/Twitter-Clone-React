import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import { Image, SpanInfo, DisplayName } from "./PersonalInfo";
import { TiLocationOutline } from "react-icons/ti";
import { FiCalendar } from "react-icons/fi";
import { COLORS } from "../constants";
import Notification from "./Notifications";
import Bookmarks from "./Bookmarks";
import SmallTweet from "./SmallTweet";
import {
  RequestActiveProfile,
  ReceiveActiveProfile,
  ReceiveActiveError,
} from "../actions";
import FollowBtn from "./FollowBtn";

const Profile = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RequestActiveProfile());

    const data = {};
    const profileData = fetch(`/api/${handle}/profile`)
      .then((res) => res.json())
      .then((res) => {
        data.profile = res.profile;
      });
    const profileFeedsData = fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((res) => (data.profileFeeds = res));

    Promise.all([profileData, profileFeedsData])
      .then(() => dispatch(ReceiveActiveProfile(data)))
      .catch((err) => dispatch(ReceiveActiveError(err)));
  }, [handle]);

  const { profile, profileFeeds, status } = useSelector(
    (state) => state.activeProfile
  );
  const { currentUser } = useSelector((state) => state.user);

  if (status === "success") {
    const {
      handle: activeHandle,
      bannerSrc,
      avatarSrc,
      displayName,
      isBeingFollowedByYou,
      isFollowingYou,
      bio,
      location,
      joined,
      numFollowers,
      numFollowing,
    } = profile;

    return (
      <Wrapper>
        <ProfileHead>
          <Banner bannerSrc={bannerSrc} />
          <div style={{ width: "calc(100% - 20px)" }}>
            <Avatar src={avatarSrc} />
            {activeHandle === currentUser.handle || (
              <FollowBtn target={profile} />
            )}
            <div>
              <DisplayName>{displayName}</DisplayName>
            </div>
            <SpanInfo>@{handle}</SpanInfo>
            {activeHandle === currentUser.handle || (
              <Relationship>
                {isBeingFollowedByYou && isFollowingYou
                  ? "Friends"
                  : isFollowingYou
                  ? "Follows You"
                  : isBeingFollowedByYou
                  ? "Followed By You"
                  : "Stranger"}
              </Relationship>
            )}
            <p>{bio}</p>
            <div>
              <SpanInfo>
                <TiLocationOutline style={{ marginRight: "10px" }} />
                {location || "Unknown"}
              </SpanInfo>
              <SpanInfo>
                <FiCalendar
                  style={{ marginRight: "10px", marginLeft: "30px" }}
                />
                Joined {joined.slice(0, 10)}
              </SpanInfo>
            </div>
            <div>
              <SpanInfo>
                <Stat>{numFollowing}</Stat>Following
              </SpanInfo>
              <SpanInfo style={{ marginLeft: "30px" }}>
                <Stat>{numFollowing}</Stat>Follower{numFollowers > 1 && "s"}
              </SpanInfo>
            </div>
          </div>
        </ProfileHead>
        <Router>
          <Main>
            <ul>
              <li>
                <NavLink to={`/profile/${handle}`} activeClassName="selected">
                  Tweets
                </NavLink>
              </li>
              <li>
                <NavLink to={`/media/${handle}`} activeClassName="selected">
                  Media
                </NavLink>
              </li>
              <li>
                <NavLink to={`/likes/${handle}`} activeClassName="selected">
                  Likes
                </NavLink>
              </li>
            </ul>
          </Main>
          <Switch>
            <Route path="/profile/:handle">
              {profileFeeds.tweetIds.map((id) => {
                return (
                  <SmallTweet key={id} tweetId={id} feeds={profileFeeds} />
                );
              })}
            </Route>
            <Route path="/media/:handle">
              <Notification />
            </Route>
            <Route path="/likes/:handle">
              <Bookmarks />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    );
  } else if (status === "loading") {
    return <CircularProgress />;
  } else {
    return <h1>404 USER-NOT-FOUND</h1>;
  }
};

const Wrapper = styled.div`
  border-left: solid lightgrey 1px;
  border-right: solid lightgrey 1px;

  width: 100%;
  height: 100vh;

  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const ProfileHead = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const Banner = styled.div`
  background-image: ${({ bannerSrc }) => `url(${bannerSrc})`};
  background-size: cover;
  width: 100%;
  height: 250px;
  margin-left: -20px;
`;

const Avatar = styled(Image)`
  width: 150px;
  position: relative;
  margin-top: -75px;
`;

const Relationship = styled(SpanInfo)`
  background-color: lightsteelblue;
  border-radius: 8px;
  margin-left: 10px;
  padding: 2px 6px;
`;

const Stat = styled(SpanInfo)`
  font-weight: bold;
  color: black;
  margin-right: 5px;
`;

const Main = styled.div`
  margin-top: 20px !important;
  ul {
    margin-left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    padding-left: 0;
  }

  li {
    width: calc(100% / 3);
    text-align: center;
  }

  a {
    display: block;
    color: black;
    width: 100%;
    border-bottom: lightgrey solid 2px;
    padding-bottom: 20px;
  }

  .selected {
    border-bottom: ${COLORS.primary} solid 2px;
    color: ${COLORS.primary};
  }
`;

export default Profile;
