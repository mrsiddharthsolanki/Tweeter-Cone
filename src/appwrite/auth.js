import conf from "../Conf/Conf";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            await this.account.create(ID.unique(), email, password, name);
            await this.account.createEmailPasswordSession(email, password);
            return await this.getCurrentUser();
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.getCurrentUser();
            console.log("Appwrite service :: login :: session", session);
            console.log("Appwrite service :: login :: user", user);
            return user; // ✅ return the user so it can be used in Login.jsx
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get(); // ✅ fixed here
            return user;
        } catch (error) {
            console.log("User not logged in or session expired", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions(); // ✅ clears all sessions
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async isLoggedIn() {
        try {
            const user = await this.getCurrentUser();
            return !!user;
        } catch {
            return false;
        }
    }

    async recoverPassword(email, redirectUrl) {
        try {
            return await this.account.createRecovery(email, redirectUrl);
        } catch (error) {
            throw error;
        }
    }

    async updateEmail(newEmail, password) {
        try {
            return await this.account.updateEmail(newEmail, password);
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(newPassword, oldPassword) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
