import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  // Effect to load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
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
      
      <section className="flex flex-col items-center justify-center h-screen text-center px-4 bg-opacity-70 backdrop-blur-lg">
        <div className="space-y-8 max-w-3xl animate-fadeIn">
          <div className="mb-6">
            <span className="bg-cyan-500 text-white text-sm px-4 py-1 rounded-full uppercase tracking-wider font-semibold">Express Yourself</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Welcome to X-Tweet
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto">
            A platform where you can tweet anything and interact with others' thoughts in a beautiful digital space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/read" className="px-8 py-3 bg-white text-purple-700 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl">
              Explore Tweets
            </Link>
            <Link to="/write" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition duration-300 shadow-lg hover:shadow-xl">
              Share Your Thoughts
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="py-6 text-center bg-black bg-opacity-50 border-t border-gray-700">
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
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;