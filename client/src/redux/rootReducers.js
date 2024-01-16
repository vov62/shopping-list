import { reducer as dataReducer } from "../redux/features/fetchDataSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: dataReducer,
});

export default rootReducers;
