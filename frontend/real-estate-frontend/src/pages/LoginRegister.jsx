import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Add this line

    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('CUSTOMER');

    // Updated state object keys to match your exact Spring Boot backend names
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: ''
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
                const response = await API.post('/api/v1/auth/authenticate', {
                    email: formData.email,
                    password: formData.password
                });

                // 1. MUST extract these variables from the backend response first!
                const { accessToken, refreshToken } = response.data;

                // 2. Now you can safely pass accessToken into the decoder
                const decodedToken = jwtDecode(accessToken);
                console.log("Newly Decoded Payload:", decodedToken);

                // Extract role and normalize it cleanly
                const userRole = decodedToken.role ? decodedToken.role.toUpperCase() : 'CUSTOMER';

                console.log("True Database Role Normalized:", userRole);

                // Pass it to your global authentication state
                login(accessToken, userRole, { refreshToken });
                setMessage('Login successful!');

                // Redirect instantly based on database authentication response role mapping
                navigate(userRole === 'DEALER' ? '/dealer' : '/customer');
            }
            else {
                // --- REGISTRATION FLOW ---
                // Sending the exact JSON structure matching your Postman payload
                await API.post('/api/v1/auth/register', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    mobileNumber: formData.mobileNumber,
                    role: role
                });

                setMessage('Registration successful! Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check your inputs.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">RealEstate Hub</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? 'Welcome back! Please sign in.' : 'Create an account to get started.'}
                    </p>
                </div>


                {/* ROLE TOGGLE SWITCH - Only shows during Registration */}
                {!isLogin && (
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
                )}

                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
                {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            {/* Row for First and Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Mobile Number Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
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