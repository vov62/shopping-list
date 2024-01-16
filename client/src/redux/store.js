import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import fetchDataReducer from "./rootReducers";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: fetchDataReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
