import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { getDataReducer } from "../reducers/getDataReducer";


const rootReducer = combineReducers({
    data: getDataReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default store