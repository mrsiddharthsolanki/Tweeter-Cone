import { useState } from "react";
import { useSelector } from "react-redux";

const AddTweetForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const loading = useSelector((state) => state.tweet.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert("Please enter some content for your tweet");
      return;
    }
    
    if (!user) {
      alert("Please log in to tweet");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ content: content.trim(), image });
      // Reset form only after successful submission
      setContent("");
      setImage(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error submitting tweet:", error);
      alert("Failed to post tweet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        e.target.value = "";
        return;
      }
      
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4 text-center text-red-500">
        Please log in to tweet.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4">
      <div className="flex items-start space-x-3">
        {/* User Avatar (optional) */}
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            maxLength="280"
            disabled={isSubmitting || loading}
          />
          
          {/* Character count */}
          <div className="text-sm text-gray-500 mt-1 text-right">
            {content.length}/280
          </div>
          
          {/* Image preview */}
          {image && (
            <div className="mt-3 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-full h-auto rounded-lg max-h-64 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting || loading}
                />
                📷 Photo
              </label>
            </div>
            
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting || loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || loading ? "Posting..." : "Tweet"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTweetForm;