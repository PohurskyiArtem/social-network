import { Route, Redirect, withRouter, HashRouter, Switch } from "react-router-dom";
import { ComponentType, FC, lazy, useEffect } from "react";
import { connect } from "react-redux";
import store, { AppStateType } from "./redux/store";
import { Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
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

const ProfileContainer = WithSuspense(lazy(() => import('./components/Profile/ProfileContainer')));
const DialogsContainer = WithSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')));

type PropsType = {
  initializeApp: () => void,
  initialized: boolean
}

const App: FC<PropsType> = ({initializeApp, initialized}) => {

const catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
  toast.error(event.reason || "Some error...");
  console.error(event);
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
              render={() => <ProfileContainer />}
            />
            <Route 
              path='/dialogs/:dialogID?' 
              render={() => <DialogsContainer />}
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SocialApp: FC = () => {
  return (
    <HashRouter>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    </HashRouter>
  )
}

export default SocialApp;