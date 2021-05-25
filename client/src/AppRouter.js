import { Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom'

import NavSideMenu from './components/NavSideMenu'
import useAuth from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

function AppRouter() {
  const isAuth = useAuth()

  return (
    <BrowserRouter>
      {isAuth && (
        <NavSideMenu>
          <Link to="/notes">Notes</Link>
          <Link to="/groups">Groups</Link>
        </NavSideMenu>
      )}
      <Switch>
        {isAuth ? (
          <>
            <Route path="/notes">
              <h1>Notes</h1>
            </Route>
            <Route path="/">
              <Redirect to="/notes" />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/registration">
              <RegistrationPage />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
