### Create a online product selling app integration on json-server

### Getting started

- create action types
- create APIs
- create actions
- create reducer
- integrate react-redux

### Task

- User should be able to see all products.
- User should be able to see add items to cart, count shown in navbar.
- User should be able to see add/uodate/remove item from cart.
- Create a middleware to check if an action is a function and if it is, invoke the action, and pass the dispatch method into it
- a user should be able to dispatch functions / async methods in the following manner

```JavaScript
dispatch( getTodos() )
// pseudo code
function getTodos => payload => (dispatch, getState) => {
  dispatch request
  return axios(config)
   .then( res=> dispatch success)
   .catch( err=> dispatch error )
}
```

### APIs:

- GET /products
- GET /cartItems
- POST /cartItems
- PATCH /cartItems/:id
- DELETE /cartItems/:id
