import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTweetForm from "../components/tweet/AddTweetForm";
import TweetList from "../components/tweet/TweetList";
import { fetchAllTweets, addTweet } from "../store/tweetSlice";
import { tweetService } from "../appwrite/TweetService";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const tweets = useSelector((state) => state.tweet.tweets);
  console.log("tweets:", tweets);
  
  const loading = useSelector((state) => state.tweet.loading);

  useEffect(() => {
    dispatch(fetchAllTweets());
  }, [dispatch]);

  const handleAddTweet = async ({ content, image }) => {
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
        userId: userData.$id,
        status: "active",
        shareCount: 0,
        likes: [],
      });

      console.log("newTweet:", newTweet);
      

      if (newTweet) {
        dispatch(addTweet(newTweet));
      }
    } catch (err) {
      console.error("Error in handleAddTweet:", err);
    }
  };


  return (
    <div className="max-w-xl mx-auto p-4">
      <AddTweetForm onSubmit={handleAddTweet} />
      {loading ? <p>Loading tweets...</p> : <TweetList tweets={tweets} />}
    </div>
  );
};

export default Home;
