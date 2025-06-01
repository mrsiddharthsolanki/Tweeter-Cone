import React, { useEffect, useState } from 'react';
import { userService } from '../../appwrite/UserService';
import TweetActions from './TweetActions';

function TweetCard({ tweet }) {
  const [userData, setUserData] = useState(null);
  console.log("tweet", tweet);
  

  useEffect(() => {
    async function fetchUser() {
      const user = await userService.getUserById(tweet.userId);
      setUserData(user);
    }

    fetchUser();
  }, [tweet.userId]);

  // ✅ Utility to generate Appwrite file preview URLs
  const getImageUrl = (fileId) => {
    if (!fileId) return "/default-user.png";
    return `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border mb-4">
      <div className="flex items-start gap-4">
        <img
          src={getImageUrl(userData.profileImage)}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold">{userData?.displayName || "User"}</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{tweet?.content}</p>

          {tweet?.image && (
            <img
              src={getImageUrl(tweet.image)}
              alt="tweet"
              className="mt-2 rounded-lg max-h-80 object-cover"
            />
          )}

          <TweetActions tweetId={tweet?.$id} />
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
