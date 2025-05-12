import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTweet } from './axios';

function Write() {
  const [tweet, setTweet] = useState('');
  const [author, setAuthor] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

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

  const handleTweetChange = (e) => {
    const newTweet = e.target.value;
    if (newTweet.length <= 280) {
      setTweet(newTweet);
      setCharCount(newTweet.length);
    }
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!tweet.trim() || !author.trim()) {
      setMessage({ text: 'Please provide both a tweet and your name', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createTweet({ tweet, author });
      
      setTweet('');
      setAuthor('');
      setCharCount(0);
      setMessage({ text: 'Tweet posted successfully!', type: 'success' });
      
      // Clear success message after 3 seconds and redirect to read page
      setTimeout(() => {
        setMessage({ text: '', type: '' });
        navigate('/read'); // Redirect to read page after successful submission
      }, 2000);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to post tweet. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white pt-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-black bg-opacity-30 backdrop-blur-lg z-10 shadow-lg">
        <Link to="/" className="text-3xl font-extrabold text-cyan-300 hover:text-white transition duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          X-Tweet
        </Link>
        <div className="space-x-8">
          <Link to="/read" className="text-lg font-medium hover:text-cyan-300 transition duration-300 border-b-2 border-transparent hover:border-cyan-300 pb-1">
            Read Tweets
          </Link>
          <Link to="/write" className="text-lg font-medium bg-cyan-500 hover:bg-cyan-600 transition duration-300 px-5 py-2 rounded-full shadow-md hover:shadow-cyan-400/50">
            Write a Tweet
          </Link>
        </div>
      </nav>

      <section className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-black bg-opacity-40 rounded-2xl shadow-xl p-8 backdrop-blur-md border border-purple-300/30 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Share Your Thoughts
          </h1>
          
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-500/70 text-white' : 'bg-red-500/70 text-white'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-cyan-200 mb-2">Your Name</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={handleAuthorChange}
                placeholder="Who's tweeting?"
                className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-purple-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition duration-200"
                maxLength={50}
                required
              />
            </div>
            
            <div>
              <label htmlFor="tweet" className="block text-sm font-medium text-cyan-200 mb-2">Your Tweet</label>
              <textarea
                id="tweet"
                value={tweet}
                onChange={handleTweetChange}
                placeholder="What's on your mind?"
                className="w-full p-4 h-32 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-purple-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition duration-200 resize-none"
                maxLength={280}
                required
              />
              <div className="flex justify-end mt-2">
                <span className={`text-sm ${charCount > 250 ? (charCount > 270 ? 'text-red-400' : 'text-yellow-300') : 'text-gray-300'}`}>
                  {charCount}/280
                </span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-lg hover:shadow-cyan-500/30 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Posting...' : 'Post Tweet'}
            </button>
          </form>
        </div>
      </section>
      
      <footer className="py-6 text-center bg-black bg-opacity-50 border-t border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-gray-300 mb-2">&copy; 2025 X-Tweet. All rights reserved.</p>
          <p className="text-xs text-gray-400">Connect, Share, Engage</p>
        </div>
      </footer>
      
      {/* Add global style for animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Write;