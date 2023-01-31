### [React-Redux](https://www.canva.com/design/DAFSl6Qnu6k/8Z81KsVJgBazKhJ4s28ywA/view?utm_content=DAFSl6Qnu6k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

#### Object Mutation

**Case 1**: We are storing the address reference of an object when we do, obj2 = obj1, hence obj1 === obj2 equals true.

```JavaScript
const obj1 = {
    name: "Masai",
    address: "Bangalore"
}

const obj2 = obj1;
console.log(obj1 === obj2) //true
```

**Case 2**: We are creating new copy of the obj1 object (using [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) operator), before storing them inside the obj2 variable, hence, obj1 === obj2 returns false.

```JavaScript
const obj1 = {
    name: "Masai",
    address: "Bangalore"
}

const obj2 = {...obj1};
console.log(obj1 === obj2) //false
```

#### Shallow Equal checks

**Example 1**: The values inside the object (1 level deep) are equal, hence shallowEqual returns true

```JavaScript
const obj1 = {
  name: "Masai",
  address: "Bangalore",
};

const obj2 = {
  name: "Masai",
  address: "Bangalore",
};

console.log(shallowEqual(obj1, obj2)); // true
```

**Example 2**: The values inside the object (1 level deep) are NOT equal (because obj1.address and obj2.address, refer to 2 different reference datatypes), hence shallowEqual returns false

```JavaScript
const obj1 = {
  name: "Masai",
  address: ["Bangalore"],
};

const obj2 = {
  name: "Masai",
  address: ["Bangalore"],
};

console.log(shallowEqual(obj1, obj2)); // false
```

##### Some more examples of shallowEqual checks

```JavaScript
shallowEqual({a: 1, b: 2}, {a: 1, b:2, c:3}) //false
shallowEqual({a: 1, b:2, c:3}, {a:1, b: 2, c:3}) //true
shallowEqual({a: 1, b: [], c: {}}, {a: 1, b: [], c: {}}) //false
```

Check the shallowEqual implementation of the redux library [here](https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.ts)
