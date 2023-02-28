import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
import PublicBlog from './pages/PublicBlog'
import Navbar from './components/Navbar'
import DetailPage from './pages/DetailPage'
import { UserContext } from './contexts/UserContext'
import SortByTag from './pages/SortByTag'

function App() {
  const [timedOut, setTimedOut] = useState(false)
  const [unsuccessful, setUnsuccessful] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [update, setUpdate] = useState(false)
  const [user, setUser] = useState(null)
  const [loginRequired, setLoginRequired] = useState(false)
  // const [loggedIn, setLoggedIn] = useState()

  return (
    <div className="App">
      <UserContext.Provider value={user}>
      <Router>
        <Navbar setTimedOut={setTimedOut} setFetching={setFetching} setUser={setUser}/>
        <Routes>
          <Route
            path='/login'
            element={<LandingPage
            loginRequired={loginRequired}
              fetching={fetching}
              setFetching={setFetching}
              setTimedOut={setTimedOut}
              timedOut={timedOut}
              unsuccessful={unsuccessful}
              setUnsuccessful={setUnsuccessful} />} />
          <Route
            path='/dashboard'
            element={<Dashboard
              setUpdate={setUpdate}
              update={update}
              fetching={fetching}
              setFetching={setFetching}
              setTimedOut={setTimedOut}
              user={user}
              setUser={setUser} />} />
          <Route
            path='/'
            element={<PublicBlog
              user={user}
              setUpdate={setUpdate}
              update={update}
              fetching={fetching}
              setFetching={setFetching}
              setTimedOut={setTimedOut} />} />
          <Route
            path='/blog/:post'
            element={<DetailPage
              setLoginRequired={setLoginRequired}
              setUser={setUser}
              user={user}
              setUpdate={setUpdate}
              update={update}
              fetching={fetching}
              setFetching={setFetching}
              setTimedOut={setTimedOut} />} />
          <Route
            path='/:tag'
            element={<SortByTag
              setUser={setUser}
              user={user}
              setUpdate={setUpdate}
              update={update}
              fetching={fetching}
              setFetching={setFetching}
              setTimedOut={setTimedOut} />} />
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
