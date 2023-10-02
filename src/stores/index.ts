import { categoryReducer } from "./slices/category.slices";
import { productReducer } from "./slices/product.slice";
import { userReducer } from "./slices/user.slices";
import { configureStore, combineReducers} from '@reduxjs/toolkit';

const RootReducer = combineReducers({
    userStore: userReducer,
    categoryStore:categoryReducer,
    productStore:productReducer
})

export type StoreType = ReturnType<typeof RootReducer>;

export const store = configureStore({
    reducer: RootReducer
})