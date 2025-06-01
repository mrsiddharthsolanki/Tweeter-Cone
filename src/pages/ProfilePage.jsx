import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../appwrite/UserService"; 
import tweetService from "../appwrite/TweetService";
import TweetList from "../components/tweet/TweetList"; 

const ProfilePage = () => {
  const userId = useSelector((state) => state.auth.userData?.$id);
  // console.log("User ID in ProfilePage:", userId);

  const [userData, setUserData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getUserById(userId);
        // console.log(user);
  
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await tweetService.getTweetsById(userId);
        setTweets(response.documents);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    }
    if (userId) fetchUser();
    if (userId) fetchTweets();
    setLoading(false);
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {userData ? (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-bold">@{userData?.displayName || userData?.username}</h3>
            <p>{userData?.bio}</p>
            {userData.profileImage && (
              <img
                src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${userData.profileImage}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2"
              />
            )}
          </div>
          <TweetList filter="profile" />
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
