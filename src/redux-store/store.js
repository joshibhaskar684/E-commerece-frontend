import { CartReducer } from "./cart/reducer";
import { OrderReducer } from "./Order/reducer";
import { ProductReducer } from "./products/reducer";
import { UserReducer } from "./user/reducer";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer=combineReducers({
user:UserReducer,
ProductReducer:ProductReducer,
CartReducer:CartReducer,
OrderReducer:OrderReducer,

});

export const store=configureStore({
    reducer:rootReducer,
});
