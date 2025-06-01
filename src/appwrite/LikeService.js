import { Client, Databases } from "appwrite";
import conf from "../Conf/Conf"

class LikeService {
    client = new Client()
    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);

    this.db = new Databases(this.client);
  }

  // 👍 Like a tweet
  async likeTweet(tweetId, userId) {
    const tweet = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTweetsCollectionId,
      tweetId
    );

    const likes = tweet.likes || [];

    if (!likes.includes(userId)) {
      likes.push(userId);

      return this.db.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        tweetId,
        { likes }
      );
    }
  }

  // 👎 Unlike a tweet
  async unlikeTweet(tweetId, userId) {
    const tweet = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTweetsCollectionId,
      tweetId
    );

    const updatedLikes = (tweet.likes || []).filter(id => id !== userId);

    return this.db.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTweetsCollectionId,
      tweetId,
      { likes: updatedLikes }
    );
  }

  // ✅ Check if user liked tweet
  async hasUserLiked(tweetId, userId) {
    const tweet = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTweetsCollectionId,
      tweetId
    );

    return (tweet.likes || []).includes(userId);
  }

  // 🔢 Get total likes
  async getLikes(tweetId) {
    const tweet = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTweetsCollectionId,
      tweetId
    );

    return tweet.likes || [];
  }
}

const likeService = new LikeService();
export default likeService; 