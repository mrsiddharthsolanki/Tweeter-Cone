import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetService from "../appwrite/TweetService";

// Fetch all tweets
export const fetchAllTweets = createAsyncThunk(
  "tweets/fetchAll", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await tweetService.getTweets();
      console.log("Fetched tweets response:", response);
      return response.documents || response || [];
    } catch (error) {
      console.error("Error fetching tweets:", error);
      return rejectWithValue(error.message || "Failed to fetch tweets");
    }
  }
);

// Create new tweet
export const createNewTweet = createAsyncThunk(
  "tweets/create",
  async ({ content, image, userId }, { rejectWithValue }) => {
    try {
      let uploadedImageId = null;

      if (image) {
        const uploadResponse = await tweetService.uploadFile(image);
        if (uploadResponse && uploadResponse.$id) {
          uploadedImageId = uploadResponse.$id;
        }
      }

      const newTweet = await tweetService.createTweet({
        content,
        image: uploadedImageId,
        userId: userId,
        status: "active",
        shareCount: 0,
        likes: [],
      });

      console.log("Created new tweet:", newTweet);
      return newTweet;
    } catch (error) {
      console.error("Error creating tweet:", error);
      return rejectWithValue(error.message || "Failed to create tweet");
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    loading: false,
    error: null,
    lastFetched: null, // Track when tweets were last fetched
  },
  reducers: {
    setTweets: (state, action) => {
      state.tweets = Array.isArray(action.payload) ? action.payload : [];
      state.lastFetched = Date.now();
    },

    addTweet: (state, action) => {
      if (!Array.isArray(state.tweets)) {
        state.tweets = [];
      }
      // Check if tweet already exists to avoid duplicates
      const existingTweet = state.tweets.find(tweet => tweet.$id === action.payload.$id);
      if (!existingTweet) {
        state.tweets.unshift(action.payload);
      }
    },

    removeTweet: (state, action) => {
      if (Array.isArray(state.tweets)) {
        state.tweets = state.tweets.filter(tweet => tweet.$id !== action.payload);
      }
    },

    updateTweet: (state, action) => {
      const { tweetId, updates } = action.payload;
      const tweetIndex = state.tweets.findIndex(tweet => tweet.$id === tweetId);
      if (tweetIndex !== -1) {
        state.tweets[tweetIndex] = { ...state.tweets[tweetIndex], ...updates };
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearTweets: (state) => {
      state.tweets = [];
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tweets cases
      .addCase(fetchAllTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("Failed to fetch tweets:", action.payload);
      })
      // Create tweet cases - Don't set loading to avoid UI freezing
      .addCase(createNewTweet.pending, (state) => {
        state.error = null;
        // Don't set loading = true to avoid blocking the UI
      })
      .addCase(createNewTweet.fulfilled, (state, action) => {
        if (!Array.isArray(state.tweets)) {
          state.tweets = [];
        }
        // Check for duplicates before adding
        const existingTweet = state.tweets.find(tweet => tweet.$id === action.payload.$id);
        if (!existingTweet) {
          state.tweets.unshift(action.payload);
        }
        state.error = null;
      })
      .addCase(createNewTweet.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        console.error("Failed to create tweet:", action.payload);
      });
  },
});

export const { 
  setTweets, 
  addTweet, 
  removeTweet, 
  updateTweet,
  setError, 
  setLoading, 
  clearError,
  clearTweets
} = tweetSlice.actions;

export default tweetSlice.reducer;