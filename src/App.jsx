import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function App() {
  axios.defaults.baseURL = 'https://todolist-api-4n7m.onrender.com';
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
{
  /* <div className="">
        <Header />
      </div>

      <div className="flex items-center justify-center h-screen w-screen">
        <div className="md:inline-flex ">
          <div className="mr-10">
            <label htmlFor="addTask">Add Task:</label>
            <input
              id="addTask"
              name="addTask"
              type="text"
              placeholder="Write what you went to do it"
              className="block w-full rounded-md p-2 m-5 mb-2 mt-2 border focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="mr-10">
            <label htmlFor="date">Deadline:</label>
            <input
              id="date"
              name="date"
              type="date"
              className="block w-full rounded-md p-2 m-5 mb-2 mt-2 border focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="flex items-center pt-5">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </div>
      </div> */
}
