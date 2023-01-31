### [React-Redux](https://www.canva.com/design/DAFSjrBo_CQ/gIz-YdVIBrf51Q0WMVuWRg/view?utm_content=DAFSjrBo_CQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### React-Redux

[Why use react-redux?](https://react-redux.js.org/introduction/why-use-react-redux)

[Docs](https://react-redux.js.org/api/hooks)

React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.

## Installation:

```JavaScript
npm install react-redux
```

Please ensure you have installed `redux` as well

## Components and hooks

- Provider
- useDispatch
- useSelector

## Provider

[Docs](https://react-redux.js.org/api/provider)

React Redux provides <Provider />, which makes the Redux store available to the rest of your app:

```JavaScript
import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    {" "}
    //similar to context API
    <App />
  </Provider>,
  rootElement
);
```

## useDispatch

This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.

```JavaScript
const dispatch = useDispatch();
```

Note: like in React's useReducer, the returned dispatch function identity is stable and won't change on re-renders (unless you change the store being passed to the <Provider>, which would be extremely unusual).

## example

```jsx
import React from "react";
import { useDispatch } from "react-redux";

// action type (actionTypes.js)
const INCREMENT_COUNTER = "INCREMENT_COUNTER";

// action creator (action.js)
const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER,
  };
};
export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch();

  const handleIncrementCounter = () => {
    const action = incrementCounter();
    dispatch(action);
  };

  return (
    <div>
      <span>{value}</span>
      <button onClick={handleIncrementCounter}>Increment counter</button>
    </div>
  );
};
```

## useSelector

Allows you to extract data from the Redux store state, using a selector function.

```js
const result = useSelector(selector: Function) // Function means the accepted type for the argument
```

The selector will be called with the entire Redux store state as its only argument. The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector).

useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.

## example

```jsx
store.getState();
// { todos: [ ... ], counter: }

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  //   todos
  return (
    <div>
      {todos.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export { TodoList };
```

## useSelector

- The selector may return any value as a result, not just an object. The return value of the selector will be used as the return value of the useSelector() hook.
- When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
- useSelector() uses strict === reference equality checks by default

You may call useSelector() multiple times within a single function component. Each call to useSelector() creates an individual subscription to the Redux store. Dispatched actions that causes multiple useSelector()s in the same component to return new values should only result in a single re-render.
