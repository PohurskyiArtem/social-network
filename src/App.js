import { Route, Redirect, withRouter, HashRouter, Switch } from "react-router-dom";
import { lazy, useEffect } from "react";
import { connect } from "react-redux";
import store from "./redux/store";
import { Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer.ts";
import { compose } from "redux";
import { WithSuspense } from "./hoc/WithSuspense";
import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';


import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";
import UsersContainer from "./components/Users/UsersContainer";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import Loader from "./components/common/Loader/Loader";
import Page404 from "./components/common/Page-404/Page404";
import { toast, ToastContainer } from "react-toastify";

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));

const App = ({initializeApp, initialized}) => {

const catchAllUnhandledErrors = (promiseRejectionEvent) => {
  toast.error(promiseRejectionEvent.reason || "Some error...");
  console.error(promiseRejectionEvent);
}

useEffect(() => {
  initializeApp()
  window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
  return () => {
    window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
  }
})

if(!initialized) {
  return <Loader />
} else {
  return (
    <div className="app-container">
      <ToastContainer position="top-center"/>
      <HeaderContainer/>
      <div className="main-wrapper">
        <Sidebar/>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Redirect to="/news" />
            </Route>
            <Route 
              path='/profile/:userID?' 
              render={WithSuspense(ProfileContainer)}
            />
            <Route 
              path='/dialogs/:dialogID?' 
              render={WithSuspense(DialogsContainer)}
            />
            <Route path='/news' render={() => <News/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/settings' render={() => <Settings/>}/>
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <Page404/> } />
          </Switch>
        </main>
      </div> 
    </div>
  );
}
};

const mapStateToProps = state => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SocialApp = props => {
  return (
    <HashRouter>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    </HashRouter>
  )
}

export default SocialApp;