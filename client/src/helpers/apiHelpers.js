export const fetchUserData = () => {
  return fetch("/api/me/profile").then((res) => res.json());
};

export const fetchHomeFeeds = () => {
  return fetch("/api/me/home-feed").then((res) => res.json());
};

export const fetchActiveProfile = (handle) => {
  return fetch(`/api/${handle}/profile`).then((res) => res.json());
};

export const fetchTweetInfo = (tweetId) => {
  return fetch(`/api/tweet/${tweetId}`).then((res) => res.json());
};

export const postTweet = (data) => {
  const tweetData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: data }),
  };

  return fetch("/api/tweet", tweetData);
};

export const followUser = (handle) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`/api/${handle}/follow`, option);
};

export const unfollowUser = (handle) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`/api/${handle}/unfollow`, option);
};

export const likeTweet = (e, tweetId, liked) => {
  e.stopPropagation();
  const likeData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ like: !liked }),
  };

  fetch(`/api/tweet/${tweetId}/like`, likeData)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const retweetTweet = (e, tweetId, isRetweeted) => {
  e.stopPropagation();
  const retweetData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ retweet: !isRetweeted }),
  };

  fetch(`/api/tweet/${tweetId}/retweet`, retweetData)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
