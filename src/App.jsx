import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Explorepage from './pages/Explorepage';
import BookmarkPage from './pages/BookmarkPage';
import CreateProfile from './pages/CreateProfile';
import ProfilePage from './pages/ProfilePage'; 
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading your data...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes fallbackElement={<LoadingScreen />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="create-profile" element={<CreateProfile />} />
          <Route path="explore" element={<Explorepage />} />
          <Route path="bookmarks" element={<BookmarkPage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
