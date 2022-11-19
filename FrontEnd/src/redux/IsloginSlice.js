import { createSlice } from '@reduxjs/toolkit';
export const IsloginSlice = createSlice({
    name: "islogin",
    initialState: { value: false },
    reducers: {
        loginState: (state, actions) => {
            state.value = actions.payload
        }
    }
});
export const { loginState } = IsloginSlice.actions;
export default IsloginSlice.reducer;
 