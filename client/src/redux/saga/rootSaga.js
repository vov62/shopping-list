import { all } from "redux-saga/effects";
import { watchFetchData } from "./dataSaga";

function* rootSaga() {
  yield all([watchFetchData()]);
}

export default rootSaga;
