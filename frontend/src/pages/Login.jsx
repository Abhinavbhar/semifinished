import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = {  email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formdata
      );

      if (response.status === 201) {
        alert("Welcome to Expense App");
        localStorage.setItem("token",response.data.token)
        window.location.href = '/dashboard';
      }
    
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("email already in use, please Sign in")
      
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <div className="text-center">
          <img src="/loading.gif" alt="Loading..." className="mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;