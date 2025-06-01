import React, { use } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaHashtag, FaBookmark, FaUser } from "react-icons/fa"; // ✅ Use icons
import { useSelector } from 'react-redux'; // 

function SlideBar() {
  const { pathname } = useLocation();

  const user = useSelector((state) => state.auth.userData);
  // console.log("User in SlideBar:", user);
  

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Explore', path: '/explore', icon: <FaHashtag /> },
    { name: 'Bookmarks', path: '/bookmarks', icon: <FaBookmark /> },
    ...(user ? [{ name: 'Profile', path: `/profile/${user.$id}`, icon: <FaUser /> }] : []),
  ];

  return (
    <aside className="w-64 h-screen p-4 bg-white dark:bg-zinc-900 border-r">
      <div className="text-2xl font-bold mb-8">
        🔥 Twitty
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${pathname === item.path ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 text-sm text-zinc-500">
        @{user?.displayName || user?.username || user?.name || 'Guest'}
      </div>
    </aside>
  );
}

export default SlideBar;
