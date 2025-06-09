import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTweets } from "../store/tweetSlice";
import TweetList from "../components/tweet/TweetList";

function Explorepage() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.loading);
  const error = useSelector((state) => state.tweet.error);
  
  console.log("tweets", tweets);

  useEffect(() => {
    // Only fetch if we don't have tweets or they're empty
    if (!tweets || tweets.length === 0) {
      dispatch(fetchAllTweets()); 
    }
  }, [dispatch, tweets]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Explore</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span>Error: {error}</span>
        </div>
      )}
      
      {loading ? (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading tweets...</p>
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
}

export default Explorepage;