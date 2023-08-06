import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const showPassword = (e) => {
    e.preventDefault();
    let element = document.querySelector('#password');
    if (element.type === 'password') {
      element.type = 'text';
      setVisible(1);
    } else {
      element.type = 'password';
      setVisible(0);
    }
  };

  const handelRequst = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/register', {
        username,
        password,
        email,
      });
      navigate('/home', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-stone-50  h-screen flex items-center">
      <form className="mx-auto mb-12 w-fit" onSubmit={handelRequst}>
        <div className=" p-4 border-solid border border-neutral-300 rounded-md ">
          <label htmlFor="username">UserName: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            id="username"
            className="block w-full rounded-md p-2 mb-2 mt-2 border focus:ring-2 focus:outline-none"
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md p-2 mb-2 mt-2 border focus:ring-2 focus:outline-none"
          />
          <label htmlFor="password">Password: </label>
          <div className="flex flex-row">
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md p-2 mb-4 border focus:ring-2 focus:outline-none"
            />
            <button onClick={showPassword} className="text-center pb-4">
              {visible === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>

          <button className="bg-emerald-600 text-white block w-full rounded-md p-2">
            Register
          </button>
          <div className="text-center  mt-2">
            <div>
              You are have an account?
              <Link to="/" className="ml-1">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
