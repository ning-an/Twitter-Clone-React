//current user data
export const RequestUserData = () => {
  return { type: "Request-user-data" };
};

export const ReceiveUserData = (data) => {
  return { type: "Receive-user-data", data };
};

export const ReceiveUserError = (err) => {
  return { type: "Receive-User-error", err };
};

//home feeds data
export const RequestHomeFeedsData = () => {
  return { type: "Request-homefeeds-data" };
};

export const ReceiveHomeFeedsData = (data) => {
  return { type: "Receive-homefeeds-data", data };
};

export const ReceiveHomeFeedsError = (err) => {
  return { type: "Receive-homefeeds-error", err };
};

//edit new post data
export const EditPost = (data) => {
  return { type: "Edit-post", data };
};

export const PostPost = () => {
  return { type: "Post-post" };
};

export const PostError = () => {
  return { type: "Post-error" };
};

//active profile
export const RequestActiveProfile = () => {
  return { type: "Request-active-profile" };
};

export const ReceiveActiveProfile = (data) => {
  return { type: "Receive-active-profile", data };
};

export const ReceiveActiveError = (err) => {
  return { type: "Receive-active-error", err };
};
