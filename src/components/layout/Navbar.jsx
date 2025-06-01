import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import { useEffect } from "react";
import authService from "../../appwrite/auth";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          console.log("No user found, logging out.");
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
        console.error("Error fetching user:", error);
      }
    };
    checkUser();
  }, [dispatch]); 

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log("User logged out successfully");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="p-4 bg-white dark:bg-zinc-900 border-b flex justify-between items-center">
      <div className="text-xl font-bold">🔥 Twitty</div>

      {!isAuthPage && (
        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                to={`/profile/${user.$id}`}
                className="text-blue-500 hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-blue-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
