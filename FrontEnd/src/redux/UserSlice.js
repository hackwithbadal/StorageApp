import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../FakeData/Data';
export const Userslice = createSlice({
    name: "userdata",
    initialState: { value: {} },
    reducers: {
        adddata: (state, actions) => {
            state.value = actions.payload
        }
    }
});
export const { adddata } = Userslice.actions;
export default Userslice.reducer;
