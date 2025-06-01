import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tweetSlice from "./tweetSlice";
import bookmarkSlice from "./bookmarkSlice";
import themeSlice from "./themeSlice";
import uiSlice from "./uiSlice";

const store = configureStore(
    {
        reducer : {
            auth : authSlice,
            tweet : tweetSlice,
            bookmark : bookmarkSlice,
            theme : themeSlice,
            ui : uiSlice,
        }
    }
)
export default store
