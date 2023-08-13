import {combineReducers,applyMiddleware,legacy_createStore as createStore} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { chatReducers } from "./reducers/chatReducers"
import { usersReducer } from "./reducers/usersReducers"
const reducer = combineReducers({
   chats:chatReducers,
   users:usersReducer
})
const initialState = {}
const middleware = [thunk]

export  const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))) 