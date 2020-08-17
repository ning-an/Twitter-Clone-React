const initialState = {
  homeFeeds: null,
  status: "idle",
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "Request-homefeeds-data":
      return { ...state, status: "loading" };
    case "Receive-homefeeds-data":
      return {
        ...state,
        homeFeeds: action.data,
        status: "success",
      };
    case "Receive-homefeeds-error":
      return { ...state, status: "error", error: action.err };
    default:
      return state;
  }
}
