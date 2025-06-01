import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../appwrite/UserService";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const CreateProfile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData);

  if (!currentUser) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
          let profileImageId = "";
          // console.log("Submitting profile with displayName:", displayName, "bio:", bio, "profileImage:", profileImage);

          if (profileImage) {
            const uploaded = await userService.uploadProfileImage(profileImage);
            console.log("Uploaded profile image:", uploaded);
            profileImageId = uploaded || "";
            console.log("Uploaded profile image ID:", profileImageId);
          }

          const response = await userService.updateUserProfile({
            userId: currentUser.$id,
            displayName,
            bio,
            profileImage: profileImageId,
          });
          // console.log("response", response);

          if (response) {
            navigate(`/profile/${currentUser.$id}`);
          } else {
            alert("Failed to update profile.");
          }
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Something went wrong.");
        } finally {
          setLoading(false);
        }
    };  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Display Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
