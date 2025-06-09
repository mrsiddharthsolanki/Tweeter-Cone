import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTweetForm from "../components/tweet/AddTweetForm";
import TweetList from "../components/tweet/TweetList";
import { fetchAllTweets, createNewTweet, clearError } from "../store/tweetSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const tweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.loading);
  const error = useSelector((state) => state.tweet.error);
  const lastFetched = useSelector((state) => state.tweet.lastFetched);

  const [refreshing, setRefreshing] = useState(false);

  console.log("tweets from Home:", tweets);
  console.log("userData:", userData);
  console.log("lastFetched:", lastFetched);

  // Fetch tweets on component mount
  useEffect(() => {
    if (userData) {
      // Only fetch if we don't have any tweets
      if (!tweets || tweets.length === 0) {
        console.log("Fetching tweets on mount...");
        dispatch(fetchAllTweets());
      }
    }
  }, [dispatch, userData]); // Removed tweets.length and lastFetched to prevent infinite loops

  // Manual refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchAllTweets()).unwrap();
    } catch (error) {
      console.error("Error refreshing tweets:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddTweet = async ({ content, image }) => {
    if (!userData || !userData.$id) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    try {
      // Clear any previous errors
      dispatch(clearError());
      
      // Dispatch the async thunk
      const result = await dispatch(createNewTweet({
        content,
        image,
        userId: userData.$id
      })).unwrap();
      
      console.log("Tweet created successfully:", result);
      return result; // Return success for the form
    } catch (err) {
      console.error("Error in handleAddTweet:", err);
      throw err; // Re-throw for form error handling
    }
  };

  // Clear error when component unmounts or user changes
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (!userData) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4 text-center text-red-500">
          Please log in to access the home page.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Home</h1>
        <button
          onClick={handleRefresh}
          disabled={loading || refreshing}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <AddTweetForm onSubmit={handleAddTweet} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>Error: {error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}
      
      {loading && !refreshing ? (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading tweets...</p>
        </div>
      ) : (
        <>
          {tweets && tweets.length > 0 ? (
            <TweetList tweets={tweets} />
          ) : (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
              <p>No tweets found. Be the first to tweet!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;