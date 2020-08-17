import React, { useState, useEffect, createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [feeds, setFeeds] = useState(null);
  const [inputPost, setInputPost] = useState("");
  const [profileTweets, setprofileTweets] = useState(null);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => setFeeds(data));
  });

  console.log(feeds);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        feeds,
        inputPost,
        setInputPost,
        profileTweets,
        setprofileTweets,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
