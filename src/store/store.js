import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tweetSlice from "./tweetSlice";
import bookmarkSlice from "./bookmarkSlice";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist config for tweets - NOW WE PERSIST TWEETS TOO
const tweetPersistConfig = {
  key: "tweet",
  storage,
  whitelist: ["tweets"], // Persist the tweets array
};

// Persist config for bookmarks
const bookmarkPersistConfig = {
  key: "bookmark",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  tweet: persistReducer(tweetPersistConfig, tweetSlice),
  bookmark: persistReducer(bookmarkPersistConfig, bookmarkSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;