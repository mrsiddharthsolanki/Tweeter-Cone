import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import userService from "../appwrite/UserService"; 
import { fetchAllTweets } from "../store/tweetSlice";
import TweetList from "../components/tweet/TweetList"; 

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);
  const allTweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.loading);
  const error = useSelector((state) => state.tweet.error);
  
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Filter tweets for current user
  const userTweets = allTweets ? allTweets.filter(tweet => tweet.userId === userId) : [];

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      try {
        setUserLoading(true);
        const user = await userService.getUserById(userId);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Fetch all tweets if we don't have them
    if (userId && (!allTweets || allTweets.length === 0)) {
      dispatch(fetchAllTweets());
    }
  }, [dispatch, userId, allTweets]);

  if (!userId) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4 text-center text-red-500">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  console.log("User Data:", userData);
  

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      
      {userLoading ? (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading profile...</p>
        </div>
      ) : userData ? (
        <>
          <div className="mb-6 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
            <h3 className="text-xl font-bold">@{userData?.displayName || userData?.username}</h3>
            {userData?.bio && <p className="text-gray-600 dark:text-gray-400 mt-2">{userData.bio}</p>}
            {userData.profileImage && (
              <img
                src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${userData.profileImage}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-4 object-cover"
              />
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {userTweets.length} Tweet{userTweets.length !== 1 ? 's' : ''}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <span>Error loading tweets: {error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center p-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading tweets...</p>
            </div>
          ) : userTweets.length > 0 ? (
            <TweetList tweets={userTweets} />
          ) : (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
              <p>You haven't posted any tweets yet.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-4 text-red-500">
          <p>Error loading profile data.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;