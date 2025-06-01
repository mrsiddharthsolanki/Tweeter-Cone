import { Client, Databases } from "appwrite";
import conf from "../Conf/Conf";    

class BookmarkService {
    client = new Client();
  constructor() {
      this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);

    this.db = new Databases(this.client);
  }

  async bookmarkTweet(userId, tweetId) {
    const user = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId
    );

    const bookmarks = user.bookmarks || [];

    if (!bookmarks.includes(tweetId)) {
      bookmarks.push(tweetId);

      return this.db.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId,
        { bookmarks }
      );
    }
  }

  // ❌ Remove bookmark
  async removeBookmark(userId, tweetId) {
    const user = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId
    );

    const updated = (user.bookmarks || []).filter(id => id !== tweetId);

    return this.db.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId,
      { bookmarks: updated }
    );
  }

  // 📚 Get all bookmarks for a user
  async getUserBookmarks(userId) {
    const user = await this.db.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersCollectionId,
      userId
    );

    return user.bookmarks || [];
  }
}

const bookmarkService = new BookmarkService();

export default bookmarkService;
