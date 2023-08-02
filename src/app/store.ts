import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'
import authReducer from "../features/auth/authSlice";

// import channelReducer from '../features/channel/channelSlice'
// import channelAuthReducer from '../features/channel/channelAuthSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    // credit: creditReducer,
    // packages: packagesReducer,
    // quests: questsReducer,
    // tabId: tabIdReducer,
    // notifications: notificationsReducer,
    // games: gamesReducer,
    // // channel: channelReducer,
    // // channelAuth: channelAuthReducer,
    // // type1Alert: type1AlertReducer,
    // // type2Alert: type2AlertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
