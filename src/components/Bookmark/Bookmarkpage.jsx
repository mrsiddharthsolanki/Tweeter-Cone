import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { TweetService as tweetService } from '../../appwrite/TweetService'
import TweetList from '../tweet/TweetList'


function Bookmarkpage() {

    const bookmarkIds = useSelector((state) => state.bookmark.bookmarks);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                setLoading(true);
                const tweetsData = await tweetService.getTweetsById(bookmarkIds);
                setTweets(tweetsData);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching tweets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, [bookmarkIds]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔖 Bookmarked Tweets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : tweets.length > 0 ? (
        <TweetList tweets={tweets} />
      ) : (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}
    </div>
    );
}

export default Bookmarkpage