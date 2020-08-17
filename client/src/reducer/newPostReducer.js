const initialState = {
  value: "",
  status: "idle",
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "Edit-post":
      return { ...state, value: action.data };
    case "Post-post":
      return { ...initialState };
    case "Post-error":
      return { ...state, error: "error" };
    default:
      return state;
  }
}
