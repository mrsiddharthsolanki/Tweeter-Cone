import TweetCard from "./TweetCard";

function TweetList({ tweets }) {
  console.log("TweetList received tweets:", tweets);

  if (!tweets || tweets.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4">
        <p className="text-center text-zinc-600 dark:text-zinc-300">No tweets available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.$id} tweet={tweet} />
      ))}
    </div>
  );
}

export default TweetList;
