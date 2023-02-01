# `Redux Thunk`

[`Redux-Thunk`](https://github.com/reduxjs/redux-thunk)

## `async`

So far we have done `synchronous` actions.

But vast majority of web applications fetch data with `asynchronous` functions.

Its much more common that we call an action creator we need to fetch some information through
API or some `asynchronous` action, and only when that request resolves are we ready to pass the
action into our reducers.

So how do we handle this `asynchronous` request?

- That is where `redux-thunk` comes into the picture.
- The purpose of redux thunk is to give direct control over the dispatch method.
- the dispatch method can be thought of as anything that happens after the action creators.

## `redux thunk`

What redux-thunk allows you to do is that, instead of returning objects in action creators,
you can start to return functions. When it is a function, redux thunk takes care of it.

`Middleware` is software that takes an incoming request, processes it, and passes it on to the next piece of middleware in the chain.

In this case, based on a type of action, we call a middleware, once its resolved or rejected, we can do the appropriate action and manage state.

## writing our own thunk middleware

```js
// if the action is a function, we will invoke the action
// otherwise we will continue with the middlewares / reducer
const thunkMiddleware = (store) => (next) => (action) => {
  return typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
};
```

### redux thunk

installation

```javascript
npm install redux-thunk redux react-redux axios
```

Lets build an `example` of fetching some github users based on a query.

Lets go about creating our store first:

We need to import applyMiddleware, and thunk from redux-thunk as shown

## `store.js`

```javascript
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));
export { store, reducer };
```

We havent made our reducer yet,
we will make the actions first before that.

## `action.js`

```javascript
import axios from "axios";

// actions
const FETCH_GITHUB_REQUEST = "FETCH_GITHUB_REQUEST";
const FETCH_GITHUB_SUCCESS = "FETCH_GITHUB_SUCCESS";
const FETCH_GITHUB_FAILURE = "FETCH_GITHUB_FAILURE";


// action creators
const fetchPostRequest = query => {
  console.log("fetch post request action called");
  return {
    type: FETCH_GITHUB_REQUEST,
    query: query || ""
  };
};

const fetchPostSuccess = data => {
  console.log("fetch post success action called");
  return {
    type: FETCH_GITHUB_SUCCESS,
    data: data
  };
};

const fetchPostFailure = error => {
  console.log("fetch post failure action called");
  return {
    type: FETCH_GITHUB_FAILURE,
    error: error
  };
};

// action to fetch the data
const fetchData = (query = null) => dispatch => {
    // dispatching request
    dispatch(fetchPostRequest());
    if(!query){
        dispatch(fetchPostFailure("no query"))
    }
    return axios
      .get(`https://api.github.com/search/users?q=${query}`)
      .then(res => {
        console.log("response success", res.data.items);
        // do some logic on response if required
        return dispatch(fetchPostSuccess(res.data.items));
      })
      .catch(err => dispatch(fetchPostFailure(err)));
  };
};

// export
export {
  fetchData
};
```

## `reducer.js`

```javascript
import {
  FETCH_GITHUB_REQUEST,
  FETCH_GITHUB_SUCCESS,
  FETCH_GITHUB_FAILURE,
} from "./actionTypes";

const initStore = {
  isLoading: false,
  query: "",
  data: [],
  error: "",
};

const reducer = (state = initStore, action) => {
  console.log("reducer called");
  switch (action.type) {
    case FETCH_GITHUB_REQUEST:
      console.log("reducer github request called");
      return {
        ...state,
        isLoading: true,
        query: action.query,
      };
    case FETCH_GITHUB_SUCCESS:
      console.log("reducer github success called", action);

      return {
        isLoading: false,
        data: action.data,
        error: state.error,
      };
    case FETCH_GITHUB_FAILURE:
      console.log("reducer github failure called");
      return {
        isLoading: false,
        data: state.data,
        error: action.error,
      };
    default:
      console.log("reducer default called");
      return state;
  }
};

export default reducer;
```

## Component:

When the component mounts, we will run the fetchData action request

`GithubProfile.js`

```javascript
import React from "react";
import { fetchData } from "../redux/action";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

function GithubProfile({ query }) {
  const { isLoading, data } = useSelector((state) => state.app, shallowEqual);
  // assuming multiple reducers
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData(query));
  }, [dispatch, query]);

  return (
    <React.Fragment>
      <div>GITHUB PROFILES</div>
      {!isLoading ? (
        data.map((item) => <div style={{ padding: 10 }}>{item.url}</div>)
      ) : (
        <div>...Loading</div>
      )}
    </React.Fragment>
  );
}
```

## `index.js`

We can now import everything into our index.js

import store, and Provider as well

```javascript
import React from "react";
import ReactDOM from "react-dom";
import GithubProfileRedux from "./components/GithubProfile";
import "./styles.css";

// importing store
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      {/* Provider created */}
      <Provider store={store}>
        <GithubProfileRedux query={"masai"} />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
