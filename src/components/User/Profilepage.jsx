// src/pages/ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {UserService as  userService} from '../../appwrite/UserService';
import {TweetService as tweetService} from '../../appwrite/TweetService';

const ProfilePage = () => {
  const userId = useSelector((state) => state.auth.userData?.$id);
  const [userData, setUserData] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const user = await userService.getUserById(userId);
        console.log('user', user);
        
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await tweetService.getTweetsByUserId(userId);
        setTweets(response.documents);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    if (userId) {
      fetchUser();
      fetchTweets();
    }
  }, [userId]);

  return (
    <div className="p-4">
      {userData ? (
        <div>
          <h1 className="text-2xl font-bold">@{userData.username}</h1>
          <p>{userData.bio}</p>
          <h2 className="text-xl mt-4">Your Tweets</h2>
          <ul>
            {tweets.map((tweet) => (
              <li key={tweet.$id} className="border-b py-2">
                {tweet.content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
