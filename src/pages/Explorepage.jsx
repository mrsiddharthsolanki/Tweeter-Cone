import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTweets } from "../store/tweetSlice";
import TweetList from "../components/tweet/TweetList";

function Explorepage() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.loading);
  console.log("tweets", tweets);
  

  useEffect(() => {
    dispatch(fetchAllTweets()); 
  }, [dispatch]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Explore</h2>
      {loading ? (
        <p>Loading tweets...</p>
      ) : (
        <TweetList filter="explore" tweets={tweets} />
      )}
    </div>
  );
}

export default Explorepage;
