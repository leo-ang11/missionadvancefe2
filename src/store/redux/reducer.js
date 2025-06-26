import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataList: [],
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setDataList: (state, action) => {
            state.dataList = action.payload;
        },
        addItem: (state, action) => {
            state.dataList.push(action.payload);
        },
        updateItem: (state, action) => {
            const index = state.dataList.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.dataList[index] = action.payload;
            }
        },
        deleteItem: (state, action) => {
            state.dataList = state.dataList.filter(
                (item) => item.id !== action.payload
            );
        },
    }
});

export const { setDataList, addItem, updateItem, deleteItem } = dataSlice.actions;
export default dataSlice.reducer;
