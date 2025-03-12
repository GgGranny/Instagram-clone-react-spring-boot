import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Dashboard'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import UserProfile from './components/UserProfile'
import Posts from './profileComponents/Posts'
import Tags from './profileComponents/Tags'
import ViewUserProfile from './components/ViewUserProfile'
function App() {

  const noSidebarLocation = ["/", "/Signup"];
  const location = useLocation();

  const showSidebar = !noSidebarLocation.includes(location.pathname);
  return (
    <div className='flex'>
      {showSidebar && (
        <div className='w-1/5 flex-shrink-0'>
          <Sidebar />
        </div>
      )}
      <div className='flex-grow'>
        <Routes>
          <Route
            path='/'
            element={<Login />}
          />
          <Route
            path='/Signup'
            element={<Signup />}
          />
          <Route path='/Home' element={<Home />} >
            <Route path='profile/:id' element={<ViewUserProfile />} />
          </Route>
          <Route path='/Profile' element={<UserProfile />} >
            <Route path='posts' element={<Posts />} />
            <Route path='tags' element={<Tags />} />
          </Route>
        </Routes>
      </div >
    </div >

  )
}

export default App
