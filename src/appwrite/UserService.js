import conf from "../Conf/Conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class UserService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);

    // console.log("conf.appwriteDatabaseId," , conf.appwriteDatabaseId);
    // console.log("conf.appwriteUsersCollectionId,", conf.appwriteUsersCollectionId);
     
  }

  async uploadProfileImage(file) {
    console.log("Uploading profile image:", file);
    try {
      const uploadedFile = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      // console.log("Profile image uploaded successfully:", uploadedFile);
      
      return uploadedFile?.$id;
    } catch (error) {
      console.error("uploadProfileImage error:", error);
      return null;
    }
  }

    async updateUserProfile({ userId, displayName, bio = "", profileImage = "", joinedAt = "" }) {

    const data = {
      userId: userId,
      displayName: displayName,
      bio: bio,
      profileImage: profileImage,
      joinedAt: joinedAt || new Date().toISOString(),
    };

    // console.log("Creating user profile with data:", data);

    try {
      const document = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        ID.unique(),
        data
      );
      return document;
    } catch (error) {
      console.error("updateUserProfile error:", error);
      throw error;
    }
  }


  async getUserById(userId) {
    // console.log("Fetching user with userId field:", userId);

    try {
      const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [Query.equal("userId", userId)]
      );


      if (response.documents.length > 0) {
        console.log("User found:", response.documents[0]);
        return response.documents[0];
      } else {
        throw new Error("No user profile found for given userId");
      }


    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getUser(userId) {
    console.log("userId", userId);
    try {
      const userDoc = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId
      );
      console.log("userDoc", userDoc);
      return userDoc;
    } catch (err) {
      console.log("Error fetching user:", err);
      return null;
    }
  };

  async searchUsers(searchQuery) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [
          Query.or([
            Query.search("displayName", searchQuery),
            Query.search("bio", searchQuery),
          ]),
        ]
      );
    } catch (error) {
      console.log("UserService :: searchUsers :: error", error);
      return false;
    }
  }
}

const userService = new UserService();
export { userService }; 
export default userService; 
