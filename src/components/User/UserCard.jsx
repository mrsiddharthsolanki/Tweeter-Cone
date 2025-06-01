import React from "react";
import { useDispatch, useSelector} from "react-redux";
import FollowService from "../../appwrite/FollowService";

function UserCard({user}) {

    const currentUser = useSelector((state) => state.user.user);
    const isFollowing = user.Followers.includes(currentUser.id);

    const handleFollow = async () => {
    if (isFollowing) {
      await followService.unfollowUser(currentUser.$id, user.$id);
    } else {
      await followService.followUser(currentUser.$id, user.$id);
    }
    // You can refresh user list here if needed
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <img src={user.profileImage} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      {user.$id !== currentUser.$id && (
        <button
          onClick={handleFollow}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  )
}

export default UserCard