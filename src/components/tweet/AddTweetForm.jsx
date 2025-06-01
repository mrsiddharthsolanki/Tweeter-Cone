import { useState } from "react";
import { useSelector } from "react-redux";

const AddTweetForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.auth.userData);
  const tweet = useSelector((state) => state.tweet.tweets)
  console.log("tweet from AddTweetForm:",tweet);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !user) return;
    onSubmit({ content, image, user });
    setContent("");
    setImage(null);
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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-2 rounded border dark:bg-zinc-800 resize-none"
      />
      <div className="flex justify-between items-center mt-2">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
        >
          Tweet
        </button>
      </div>
    </form>
  );
};

export default AddTweetForm;
