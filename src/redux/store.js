import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';

let reducers = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, compose(applyMiddleware(thunkMiddleware), composeEnhancers()));
window.store = store;

export default store;

