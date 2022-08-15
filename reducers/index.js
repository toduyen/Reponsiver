import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import loading from "./loading.reducer";
import explanation from "./qly-thong-bao.reducer";
import manageUserReducer from "./manage.user.reducer";
import commonReducer from "./common.reducer";
import businessSNMReducer from "./business.snm.reducer";
import requestArise from "./handleRequestArise.reducer";
import dmCbosReducer from "./dm-cbos.reducer";
import dmPbansReducer from "./dm-pbans.reducer";
import qlyTqkyReducer from "./qly-tqky.reducer";
import temReducer from "./tem.reducer";

export default combineReducers({
  authReducer,
  loading,
  explanation,
  manageUserReducer,
  commonReducer,
  businessSNMReducer,
  requestArise,
  dmCbosReducer,
  dmPbansReducer,
  qlyTqkyReducer,
  temReducer,
});
