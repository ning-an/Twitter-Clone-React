import { combineReducers } from "redux";

import user from "./userReducer";
import homeFeeds from "./homefeedReducer";
import newPost from "./newPostReducer";
import activeProfile from "./activeProfileReducer";

export default combineReducers({ user, newPost, activeProfile, homeFeeds });
