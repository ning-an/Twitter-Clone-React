const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "Request-user-data":
      return { ...state, status: "loading" };
    case "Receive-user-data":
      return {
        ...state,
        currentUser: action.data,
        status: "success",
      };
    case "Receive-User-error":
      return { ...state, status: "error", error: action.err };
    default:
      return state;
  }
}
