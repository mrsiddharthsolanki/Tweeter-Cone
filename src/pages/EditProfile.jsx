import React,{useState} from "react";
import { useSelector } from "react-redux";
import { UserService as userService } from "../appwrite/UserService";

function EditProfile() {

    const currentUser = useSelector((state) => state.user.user);

    const [name, setName] = useState(currentUser.name);
    const [bio, setBio] = useState(currentUser.bio || "");
    const [profileImage, setProfileImage] = useState(currentUser.profileImage);

    const handleUpdateProfile = async () => {
        await userService.updateUserProfile({
            userId: currentUser.$id,
            displayName: name,
            bio,
            profileImage,
        })
        alert("Profile updated suctcessfully");
    }

    return (
        <div className="p-5" >
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <input type="text"
            placeholder="name"
            value={name}
            className="input w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setName(e.target.value)}
            />

            <textarea 
            placeholder="bio"
            value={bio}
            className="input w-full h-24 border border-gray-300 rounded-md p-2 mt-2"
            onChange={(e) => setBio(e.target.value)}    
            ></textarea>

            <input type="text"
            placeholder="profile image url"
            value={profileImage}
            className="input w-full border border-gray-300 rounded-md p-2 mt-2"
            onChange={(e) => setProfileImage(e.target.value)}
            />

            <button
            className="bg-blue-600 text-white py-2 px-4 mt-3 rounded"
            onClick={handleUpdateProfile}
            >
                Update Profile
            </button>

        </div>
    );
}

export default EditProfile;