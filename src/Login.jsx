import { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handelRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', { email, password });
      navigate('/home', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="bg-stone-50   h-screen flex items-center">
      <form className="w-64 mx-auto mb-12 " onSubmit={handelRequest}>
        <div className=" p-4 border-solid border border-neutral-300 rounded-md">
          <label htmlFor="username">Email: </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="example@gmail.com"
            id="username"
            className="block w-full rounded-md p-2 mb-2 mt-2 border"
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="block w-full rounded-md p-2 mb-4 border"
          />
          <button className="bg-emerald-600 text-white block w-full rounded-md p-2">
            Login
          </button>
          <div className="text-center  mt-2">
            <div>
              Don't have an account?
              <Link to="/register" className="ml-1">
                Register
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
