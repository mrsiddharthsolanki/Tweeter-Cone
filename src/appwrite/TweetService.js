import conf from "../Conf/Conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class TweetService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createTweet({ content, image, status = "active", userId, shareCount = 0, likes = [] }) {
    try {
      const tweetId = ID.unique();
      const tweet = {
        content,
        image,
        status,
        userId,
        shareCount,
        likes,
        createdAt: new Date().toISOString(),
      };

      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        tweetId,
        tweet
      );
    } catch (error) {
      console.error("Appwrite service :: createTweet :: error", error);
      return false;
    }
  }

  async updateTweet(tweetId, { content, image, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        tweetId,
        {
          content,
          image,
          status,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updateTweet :: error", error);
      return false;
    }
  }

  async deleteTweet(tweetId) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        tweetId
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteTweet :: error", error);
      return false;
    }
  }

  async getTweet(tweetId) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        tweetId
      );
    } catch (error) {
      console.error("Appwrite service :: getTweet :: error", error);
      return false;
    }
  }

  async getTweets(queries = [Query.equal("status", "active")]) {
    try {
      const res = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        queries
      );
      return res.documents;
    } catch (error) {
      console.error("Appwrite service :: getTweets :: error", error);
      return [];
    }
  }

  async getTweetsById(userId) {
    try {
      const res = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTweetsCollectionId,
        [Query.equal("userId", userId)]
      );
      return res.documents;
    } catch (error) {
      console.error("Appwrite service :: getTweetsById :: error", error);
      return [];
    }
  }

  async uploadFile(file) {
    try {
      const fileId = ID.unique();
      return await this.storage.createFile(conf.appwriteBucketId, fileId, file);
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      return null;
    }
  }
}

const tweetService = new TweetService();
export { tweetService };
export default tweetService;
