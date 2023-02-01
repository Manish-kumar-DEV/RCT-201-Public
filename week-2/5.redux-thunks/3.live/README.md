### Redux-Thunk

Redux Thunk is a middleware used in Redux to handle async requests

### Documentation : [Link](https://redux.js.org/usage/writing-logic-thunks)

### Itenary

- applyMiddleware
  - logger
- async actions
  - how to handle them in redux
  - redux-thunk

### Getting started

- `cd boil`
- `npm i redux react-redux redux-thunk`
- `json-server --watch db.json --port 8080`
- in second terminal: `npm start`

### Goal

- Migrate the given multi-page auth based application with API integrations to redux application.

## Redux Thunk code

```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunk));
```
