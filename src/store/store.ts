import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./slices/posts.slice";
import commentsReducer from "./slices/comments.slice";
import authReducer from "./slices/auth.slice";
import dashboardReducer from "./slices/dashboard.slice";
import accountDashboardReducer from "./slices/accountDashboard.slice";



export const store = configureStore({
    reducer:{
        posts: postsReducer,
        comments: commentsReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        accountDashboard: accountDashboardReducer,

    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;