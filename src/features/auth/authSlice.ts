import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  checkUser,
  signStartWithWallet,
  signCompleteWithWallet,
} from "./authAPI";
import { AuthState, User } from "./authTypes";

const initialState: AuthState = {
  value: null,
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data: User) => await checkUser(data)
);

export const signInWithWalletAsync = createAsyncThunk(
  "auth/signInWithWalletAsync",
  async () => {
    /* @ts-ignore */
    // const web3 = new Web3(window.ethereum)
    // // const userSelectedAddress = await web3.eth.getAccounts(
    // //   (accounts) => accounts
    // // )
    // const startData = await signStartWithWallet({
    //   address: userSelectedAddress[0],
    // })
    // if (startData.success) {
    //   /* @ts-ignore */
    //   const temp_password = startData.temp_password
    //   /* @ts-ignore */
    //   const signature = await web3.eth.personal.sign(
    //     `Mushboomers verification code : ${temp_password}`,
    //     // `Tracker verification code : ${temp_password}`,
    //     userSelectedAddress[0]
    //   )
    //   return await signCompleteWithWallet({
    //     address: userSelectedAddress[0],
    //     signature,
    //     temp_password,
    //   })
    // } else {
    //   throw new Error('Sign Start Failed')
    // }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.value = null;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder

      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.value = {
          user: localStorage.getItem("user") || "",
          token: localStorage.getItem("token") || "",
        };
      })
      .addCase(checkUserAsync.rejected, (state) => {
        localStorage.setItem("user", "");
        localStorage.setItem("token", "");
        state.status = "failed";
        state.value = null;
      })
      .addCase(signInWithWalletAsync.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(signInWithWalletAsync.fulfilled, (state, action) => {
      //   state.status = 'idle'
      //   localStorage.setItem('user', action.payload.address)
      //   localStorage.setItem('token', action.payload.token)
      //   state.value = {
      //     user: action.payload.address,
      //     token: action.payload.token,
      //   }
      // })
      .addCase(signInWithWalletAsync.rejected, (state) => {
        localStorage.setItem("user", "");
        localStorage.setItem("token", "");
        state.status = "failed";
        state.value = null;
      });
  },
});
export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;