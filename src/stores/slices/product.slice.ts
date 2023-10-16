import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
    [x: string]: any;
    data: any
}

const initialState: ProductState = {
    data: null
}
// const initialState: {
//     data: null | undefined | ProductState[]
// }= {
//     data: null
// };

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductData: (state, action) => {   
            return {
                data: action.payload
            }
        },
        setNewProduct: (state, action) => {
            console.log("action",action);
            
            return {
                data: [...state.data, action.payload]
            }
        },
    }
})

export const productAction = {
    ...productSlice.actions
}


export const productReducer = productSlice.reducer

