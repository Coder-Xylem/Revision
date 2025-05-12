import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTweets, likeTweet, dislikeTweet } from './axios';

function Read() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterBy, setFilterBy] = useState('newest');
  const [animateCard, setAnimateCard] = useState(null);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      try {
        const data = await getTweets();
        
        // Sort tweets based on filter
        let sortedTweets = [...data];
        if (filterBy === 'newest') {
          sortedTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filterBy === 'popular') {
          sortedTweets.sort((a, b) => (b.like - b.dislike) - (a.like - a.dislike));
        }
        
        setTweets(sortedTweets);
      } catch (err) {
        console.error("Failed to fetch tweets:", err);
        setError("Failed to load tweets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTweets();
  }, [filterBy]);

  const handleLike = async (id) => {
    try {
      const response = await likeTweet(id);
      
      setTweets((prev) =>
        prev.map((tweet) =>
          tweet._id === id ? { ...tweet, like: response.like, dislike: response.dislike } : tweet
        )
      );
      
      setAnimateCard(id + '_like');
      setTimeout(() => setAnimateCard(null), 700);
    } catch (err) {
      console.error("Failed to like:", err);
      // Check if it's the "already liked" error
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || "You've already liked this tweet");
      }
    }
  };

  const handleDislike = async (id) => {
    try {
      const response = await dislikeTweet(id);
      
      setTweets((prev) =>
        prev.map((tweet) =>
          tweet._id === id ? { ...tweet, like: response.like, dislike: response.dislike } : tweet
        )
      );
      
      setAnimateCard(id + '_dislike');
      setTimeout(() => setAnimateCard(null), 700);
    } catch (err) {
      console.error("Failed to dislike:", err);
      // Check if it's the "already disliked" error
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || "You've already disliked this tweet");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white pt-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-black bg-opacity-30 backdrop-blur-lg z-10 shadow-lg">
        <Link to="/" className="text-3xl font-extrabold text-cyan-300 hover:text-white transition duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          X-Tweet
        </Link>
        <div className="space-x-8">
          <Link to="/read" className="text-lg font-medium bg-cyan-500 hover:bg-cyan-600 transition duration-300 px-5 py-2 rounded-full shadow-md hover:shadow-cyan-400/50">
            Read Tweets
          </Link>
          <Link to="/write" className="text-lg font-medium hover:text-cyan-300 transition duration-300 border-b-2 border-transparent hover:border-cyan-300 pb-1">
            Write a Tweet
          </Link>
        </div>
      </nav>

      <section className="px-4 md:px-10 py-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white mb-4 md:mb-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Latest Tweets
          </h1>
          
          <div className="flex gap-2 bg-black bg-opacity-30 p-1 rounded-full">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filterBy === 'newest' ? 'bg-cyan-500 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setFilterBy('newest')}
            >
              Newest
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filterBy === 'popular' ? 'bg-cyan-500 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setFilterBy('popular')}
            >
              Popular
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-70 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        ) : tweets.length > 0 ? (
          <div className="space-y-6">
            {tweets.map((tweet) => (
              <div
                key={tweet._id}
                className={`bg-black bg-opacity-50 p-6 rounded-xl shadow-lg border border-purple-300/30 transition-all hover:shadow-lg hover:shadow-cyan-500/20 ${
                  animateCard === tweet._id + '_like' ? 'animate-pulse-green' : 
                  animateCard === tweet._id + '_dislike' ? 'animate-pulse-red' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyan-200">{tweet.author}</h3>
                  <p className="text-xs text-gray-300">{formatDate(tweet.createdAt)}</p>
                </div>
                <p className="mt-2 text-lg text-gray-100 whitespace-pre-wrap">{tweet.tweet}</p>
                <div className="flex justify-end mt-6 space-x-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">
                      {tweet.like - tweet.dislike} points
                    </span>
                  </div>
                  <button
                    onClick={() => handleLike(tweet._id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 bg-opacity-80 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 shadow-md hover:shadow-cyan-500/50"
                  >
                    <span>👍</span> <span>{tweet.like}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(tweet._id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 bg-opacity-80 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 shadow-md hover:shadow-red-500/50"
                  >
                    <span>👎</span> <span>{tweet.dislike}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-black bg-opacity-30 p-8 rounded-xl text-center">
            <h3 className="text-xl font-medium text-gray-300 mb-4">No tweets available yet.</h3>
            <Link to="/write" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition duration-300 shadow-lg">
              Be the first to tweet!
            </Link>
          </div>
        )}
      </section>

      <footer className="text-center py-6 bg-black bg-opacity-50 border-t border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-gray-300 mb-2">&copy; 2025 X-Tweet. All rights reserved.</p>
          <p className="text-xs text-gray-400">Connect, Share, Engage</p>
        </div>
      </footer>
      
      {/* Add animations */}
      <style>{`
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 rgba(52, 211, 153, 0); }
          50% { box-shadow: 0 0 20px rgba(52, 211, 153, 0.5); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 rgba(239, 68, 68, 0); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
        }
        .animate-pulse-green {
          animation: pulseGreen 0.7s ease-in-out;
        }
        .animate-pulse-red {
          animation: pulseRed 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Read;