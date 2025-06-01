import { Client, Databases } from "appwrite";
import conf from "../Conf/Conf";

class FollowService {
    client = new Client();
    db = new Databases(this.client);

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.db = new Databases(this.client);
  }

  // 🔔 Follow a user
  async followUser(currentUserId, targetUserId) {
    const currentUser = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      currentUserId
    );

    const targetUser = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      targetUserId
    );

    const following = currentUser.following || [];
    const followers = targetUser.followers || [];

    if (!following.includes(targetUserId)) {
      following.push(targetUserId);
      await this.db.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        currentUserId,
        { following }
      );
    }

    if (!followers.includes(currentUserId)) {
      followers.push(currentUserId);
      await this.db.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        targetUserId,
        { followers }
      );
    }
  }

  // ❌ Unfollow a user
  async unfollowUser(currentUserId, targetUserId) {
    const currentUser = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      currentUserId
    );

    const targetUser = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      targetUserId
    );

    const updatedFollowing = (currentUser.following || []).filter(id => id !== targetUserId);
    const updatedFollowers = (targetUser.followers || []).filter(id => id !== currentUserId);

    await this.db.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      currentUserId,
      { following: updatedFollowing }
    );

    await this.db.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      targetUserId,
      { followers: updatedFollowers }
    );
  }

  // 👥 Get followers
  async getFollowers(userId) {
    const user = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId
    );

    return user.followers || [];
  }

  // 👣 Get following
  async getFollowing(userId) {
    const user = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId
    );

    return user.following || [];
  }
}

const followService = new FollowService();
export default followService;