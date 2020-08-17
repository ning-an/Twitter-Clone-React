import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import GlobalStyle from "./components/GlobalStyles";
import HomeFeed from "./components/HomeFeed";
import Notification from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import Tweet from "./components/TweetDetails";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Error from "./components/Error";
import { fetchUserData } from "./helpers/apiHelpers";
import { RequestUserData, ReceiveUserData, ReceiveUserError } from "./actions";
import { FiLoader } from "react-icons/fi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RequestUserData());

    fetchUserData()
      .then((data) => dispatch(ReceiveUserData(data.profile)))
      .catch((err) => {
        console.log("there is error");
        dispatch(ReceiveUserError(err));
      });
  }, []);

  const { status } = useSelector((state) => state.user);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Wrapper>
        <Sidebar />
        {status === "success" ? (
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notification />
            </Route>
            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <Tweet />
            </Route>
            <Route path="/profile/:handle">
              <Profile />
            </Route>
          </Switch>
        ) : status === "loading" ? (
          <Loader>
            <FiLoader style={{ fontSize: "30px" }} />
          </Loader>
        ) : (
          <Error />
        )}
      </Wrapper>
    </Router>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  margin-right: 10px;
`;

const spin = keyframes`
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
`;

const Loader = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 100px;
  left: 60%;
  animation: ${spin} 1s linear infinite;
`;
