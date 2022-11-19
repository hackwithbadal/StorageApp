import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Contact from './Components/Contact'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/User/Login';
import SignUp from './Components/User/SignUp'
import NotFound from './Components/NotFoundPage.js/NotFound';
import DashBoard from './Components/DashBoard/DashBoard';
import Profile from './Components/User/Profile';
import Hosting from './Components/Hosting/Hosting';
import Upload from './Components/Uploads/Upload';
import Suggestion from './Components/Suggestion/Suggestion';
import Files from './Components/Files/Files';
// require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} index />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/hosting' element={<Hosting />} />
          <Route path='/files' element={<Files />} />
          <Route path='/suggestions' element={<Suggestion />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
