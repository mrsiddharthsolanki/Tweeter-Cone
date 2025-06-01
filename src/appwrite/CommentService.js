import conf from "../Conf/Conf";
import { Client, Databases, ID, Query } from "appwrite";

export class CommentService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    
    async addComment({ tweetId, userId, content }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    tweetId,
                    userId,
                    content,
                    createdAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.log("CommentService :: addComment :: error", error);
            return false;
        }
    }

    // Get all comments for a specific tweet
    async getComments(tweetId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                [Query.equal("tweetId", tweetId)]
            );
        } catch (error) {
            console.log("CommentService :: getComments :: error", error);
            return false;
        }
    }

    // Delete a comment by commentId
    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId
            );
            return true;
        } catch (error) {
            console.log("CommentService :: deleteComment :: error", error);
            return false;
        }
    }
}

const commentService = new CommentService();
export default commentService;
