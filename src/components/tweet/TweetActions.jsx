import { Heart, MessageCircle, Bookmark } from "lucide-react";

const TweetActions = ({ tweetId }) => {
  return (
    <div className="flex gap-6 mt-2 text-zinc-600 dark:text-zinc-300 text-sm">
      <button className="flex items-center gap-1 hover:text-red-500">
        <Heart size={18} /> Like
      </button>
      <button className="flex items-center gap-1 hover:text-blue-500">
        <MessageCircle size={18} /> Comment
      </button>
      <button className="flex items-center gap-1 hover:text-yellow-500">
        <Bookmark size={18} /> Save
      </button>
    </div>
  );
};

export default TweetActions;
