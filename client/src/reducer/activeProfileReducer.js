const initialState = {
  profile: null,
  profileFeeds: null,
  status: "idle",
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "Request-active-profile":
      return { ...state, status: "loading" };
    case "Receive-active-profile":
      return {
        ...state,
        profile: action.data.profile,
        profileFeeds: action.data.profileFeeds,
        status: "success",
      };
    case "Receive-active-error":
      return { ...state, error: "error" };
    default:
      return state;
  }
}
