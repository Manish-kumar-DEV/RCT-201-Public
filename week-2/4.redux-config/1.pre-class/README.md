### [Redux Configuation](https://www.canva.com/design/DAFSjrJiW5Q/d1fPeaqdgBhC9BtDyY5ipQ/view?utm_content=DAFSjrJiW5Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

- combinedReducer
- ReduxDevTools (chrome extension)
- compose

## combineReducers:

It is important to keep our code structured, so when the app becomes larger it is quite common to separate the reducers and action based on their functionality or other factors:

For example you can have

- auth reducers
- user reducers
- admin reducers

##

We do this due to separation of concerns:

```
Folder structure if you are separating based on functionality
- redux
    - store.js
    - auth
        - action.js
        - reducer.js
    - user
        - action.js
        - reducer.js
    - admin
        - action.js
        - reducer.js
```

We need to maintain the initial state inside each function

```javascript

const  reducer = ( state = initState, {type, payload} ) => { ... }
export {reducer}
```

## `store.js`

So in our store.js

```javascript
import { createStore, combineReducer } from "redux";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";

// combineReducer takes an object as argument
const rootReducer = combineReducer({ auth: authReducer, user: userReducer });

// this will lead to creating your store like this
// assuming the initState in each reducer are both Objects
//  { auth: {...} user: { ... } }

const store = createStore(rootReducer);
```
