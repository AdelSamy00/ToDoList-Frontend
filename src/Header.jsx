import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'flowbite';
const Header = (props) => {
  const navigate = useNavigate();
  const logout = async () => {
    axios
      .post('/logout')
      .then(() => {
        window.sessionStorage.clear();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <nav className=" bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="items-center inline-flex">
            <div
              className="rounded-[50px]"
              src="https://via.placeholder.com/93x100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[50px] h-[50] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-800 dark:text-white inline-flex p-4">
              {props.username}
            </span>
          </div>
          <div className="items-center sm:inline-flex hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-800 dark:text-white inline-flex p-4">
              To Do List
            </span>
          </div>

          <div className="sm:inline-flex md:order-2 ">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
