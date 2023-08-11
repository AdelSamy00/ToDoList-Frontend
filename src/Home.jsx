import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AuthContext from './context/AuthProvider';

export default function Home() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState(['']);
  const getTime = () => {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    return date.toLocaleDateString('sv');
  };
  const [deadline, setDeadline] = useState(getTime());
  const getUserData = async (userId) => {
    axios
      .get(`/getUser/${userId}`)
      .then((res) => {
        setUser(res.data.user);
        setNotes(res.data.user.notes);
      })
      .catch((err) => console.log(err));
  };
  const addTask = async (e, newTask, deadline, userId) => {
    axios
      .post('/addTask', { newTask, deadline, userId })
      .then(() => {
        setNewTask('');
        setDeadline(getTime());
        getUserData(userId);
      })
      .catch((err) => console.log(err));
  };
  const completeTask = async (noteId) => {
    axios
      .put('/completeTask', { noteId })
      .then(() => {
        getUserData(userId);
      })
      .catch((err) => console.log(err));
  };
  const deleteTask = async (noteId) => {
    axios
      .delete(`/deleteTask/${userId}&${noteId}`)
      .then(() => {
        getUserData(userId);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log(auth);
    if (!window.sessionStorage.getItem('token')) {
      navigate('/');
    }
    axios
      .get('/profile')
      .then((res) => {
        setUserId(res.data.userId);
        getUserData(res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth, navigate]);
  return (
    <div>
      <div className="mb-32">
        <Header {...user} />
      </div>
      <div className="flex items-start justify-center w-full ">
        <div className="md:inline-flex ">
          <div className="">
            <label htmlFor="newTask">Add Task:</label>
            <input
              id="newTask"
              name="newTask"
              value={newTask}
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Write what you went to do it"
              className="block w-56 rounded-md p-2 m-5 mb-2 mt-2 border focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="">
            <label htmlFor="deadline">Deadline:</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={deadline}
              className="block w-56 rounded-md p-2 m-5 mb-2 mt-2 border focus:ring-2 focus:outline-none"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex items-center pt-5">
            <button
              type="button"
              className="block w-full p-2 m-5 mb-2 mt-2 border 
              text-white bg-green-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  md:mr-0"
              onClick={(e) => {
                addTask(e, newTask, deadline, userId);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-16 w-full">
        <div className="relative overflow-x-auto ">
          <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {notes.length > 0 ? (
                notes.map((el, i) => {
                  if (el.status == 'panding') {
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[400px] truncate"
                        >
                          {el.body}
                        </th>
                        <td className="px-6 py-4">{el.deadline}</td>
                        <td className="px-6 py-4">{el.status}</td>
                        <td className="px-6 py-4">
                          <button
                            className="text-white bg-green-700  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 "
                            onClick={() => completeTask(el._id)}
                          >
                            Complete
                          </button>
                          <button
                            className="ml-2 mt-2 md:mt-0 text-white bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                            onClick={() => deleteTask(el._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium bg-green-500  text-white whitespace-nowrap dark:text-white"
                        >
                          {el.body}
                        </th>
                        <td className="px-6 py-4 text-white bg-green-500">
                          {el.deadline}
                        </td>
                        <td className="px-6 py-4 text-white bg-green-500">
                          {el.status}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="ml-3 sm:ml-14 text-white bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                            onClick={() => deleteTask(el._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  ></th>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
