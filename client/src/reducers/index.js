import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import viewDeveloperReducer from "./viewDeveloperProfileReducer";
import postReducer from "./postReducer";
import devViewReducer from "./devViewReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  devprofile: viewDeveloperReducer,
  post: postReducer,
  devCurrentProfile: devViewReducer
});
