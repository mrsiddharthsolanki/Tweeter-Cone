import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Explorepage from './pages/Explorepage';
import BookmarkPage from './pages/BookmarkPage';
import CreateProfile from './pages/CreateProfile';
import ProfilePage from './pages/ProfilePage'; 
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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
