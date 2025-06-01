import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingUser = await authService.getCurrentUser();
            
            if (existingUser) {
                await authService.logout();
            }
            const userData = await authService.login({ email, password });

            if (userData) {
                dispatch(login({ userData }));
                navigate(`/profile/${userData.$id}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-semibold shadow">
                    Login
                </button>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
                </p>
            </form>
        </div>

  )
}

export default Login