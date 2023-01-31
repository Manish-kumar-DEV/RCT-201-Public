### Counter Application

- Use redux to create a store and write in the following files
  - action.js ( action object creators )
  - reducer.js ( reducer function )
  - store.js ( store )
- Create these components
  - Counter.jsx
  - CounterValue.jsx ( contains the counter value, retrieve it from store ).
  - CounterButtons.jsx ( dispatch the actions for incrementing and decrementing counter value )
- Create a forceUpdate function, that will help us in re-rendering the React component, to show the updated counter value for the Redux store
- Attach the `forceUpdate` to the store.subscribe method

```JavaScript
const [state, setState ] = useState(0);
const forceUpdate = ( ) => setState(prev=>prev+1)
```

- on clicking the add and reduce the values should be updated in the counter
