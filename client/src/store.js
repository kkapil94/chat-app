import {combineReducers,applyMiddleware,legacy_createStore as createStore} from "redux"
import { chatReducers } from "./reducers/chatReducers"

import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
const reducer = combineReducers({
   chats:chatReducers
})
const initialState = {}
const middleware = [thunk]

export  const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))) 