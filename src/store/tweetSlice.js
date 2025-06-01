import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetService from "../appwrite/TweetService";

export const fetchAllTweets = createAsyncThunk("tweets/fetchAll", async () => {
  const response = await tweetService.getTweets();
  return response.documents;
});

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    loading: false, 
    error: null,
  },
  reducers: {
    setTweets: (state, action) => {
      state.tweets = action.payload;
    },

    addTweet: (state, action) => {
      if (!state.tweets) {
        state.tweets = []; 
        console.log(state.tweets);
        
      }
      state.tweets.unshift(action.payload);
    },

    removeTweet: (state, action) => {
      state.tweets = state.tweets.filter(tweet => tweet.$id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setTweets, addTweet, removeTweet, setError, setLoading} = tweetSlice.actions
export default tweetSlice.reducer;
