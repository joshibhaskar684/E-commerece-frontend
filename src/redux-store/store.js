import { UserReducer } from "./user/reducer";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer=combineReducers({
user:UserReducer,
});

export const store=configureStore({
    reducer:rootReducer,
});
