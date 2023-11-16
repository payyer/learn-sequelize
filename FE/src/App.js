import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Users from './Views/users/Users';
import Login from './Views/home/Login';
import Register from './Views/register/Register';
import Project from './Views/projects/Project';
function App() {
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   const session = sessionStorage.getItem('accout');
  //   if (session) {
  //     setUser(JSON.parse(session));
  //   } else {
  //     setUser({})
  //   }
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </>
  );
}

export default App;
