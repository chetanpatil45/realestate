import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const LoginRegister = () => {
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [role, setRole] = useState('CUSTOMER');   // Toggle between CUSTOMER and DEALER

    // Form Fields State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            if (isLogin) {
                // --- LOGIN FLOW ---
                // Your Spring Boot endpoint: /api/v1/auth/authenticate [POST]
                const response = await API.post('/api/v1/auth/authenticate', {
                    email: formData.email,
                    password: formData.password,
                    //   role: role // Sending the selected role context
                });

                // Expecting your backend to return { token, userDetails }
                const { accessToken, refreshToken } = response.data;

                login(accessToken, role, {
                    refreshToken
                });
                setMessage('Login successful!');

            } else {
                // --- REGISTRATION FLOW ---
                // Your Spring Boot endpoint: /api/v1/auth/register [POST]
                await API.post('/api/v1/auth/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: role // Saves user in MySQL with this specific role
                });

                setMessage('Registration successful! Please log in.');
                setIsLogin(true); // Switch to login tab after registering
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">

                {/* Header Text */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">RealEstate Hub</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? 'Welcome back! Please sign in.' : 'Create an account to get started.'}
                    </p>
                </div>

                {/* ROLE TOGGLE SWITCH */}
                <div className="flex bg-gray-200 p-1 rounded-lg">
                    <button
                        type="button"
                        className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${role === 'CUSTOMER' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:text-gray-950'
                            }`}
                        onClick={() => setRole('CUSTOMER')}
                    >
                        Customer
                    </button>
                    <button
                        type="button"
                        className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${role === 'DEALER' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:text-gray-950'
                            }`}
                        onClick={() => setRole('DEALER')}
                    >
                        Dealer (Agent)
                    </button>
                </div>

                {/* Error & Success Messages */}
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
                {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}

                {/* Form elements */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                </form>

                {/* Bottom Toggle between Login/Register state */}
                <div className="text-center text-sm">
                    <button
                        type="button"
                        className="font-medium text-blue-600 hover:text-blue-500"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setMessage('');
                        }}
                    >
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginRegister;