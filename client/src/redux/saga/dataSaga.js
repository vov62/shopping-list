import { call, put, takeLatest } from "redux-saga/effects";
import {
  DATA_FETCH_REQUESTED,
  DATA_FETCH_FAILED,
  DATA_FETCH_SUCCEED,
} from "../../redux/features/fetchDataSlice";
import fetchShoppingData from "../../api/api";

function* fetchData(actions) {
  // call, put, takeLatest = redux saga effects
  // takeLatest = listen for the action
  // call = makes api call
  // pur = trigger action
  try {
    // call the api function and tell it to wait till all the information come back before move on to other code
    const dataRes = yield call(fetchShoppingData, actions.payload);
    if (dataRes.error) {
      // call the actions,
      yield put({ type: DATA_FETCH_FAILED, payload: dataRes.error });
    } else {
      yield put({ type: DATA_FETCH_SUCCEED, payload: dataRes.data });
    }
  } catch (error) {
    yield put({
      type: DATA_FETCH_FAILED,
      payload: error.message || "An error occurred",
    });
  }
}

function* watchFetchData() {
  // yield = everything after this word will paused and wait until finish before moves on to the next line
  // takeLatest = any time 'DATA_FETCH_REQUESTED' action happen, 'fetchData' is trigged
  yield takeLatest(DATA_FETCH_REQUESTED, fetchData);
}

export { watchFetchData };
