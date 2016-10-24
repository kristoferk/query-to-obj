
# queryToObj

![](https://api.travis-ci.org/kristoferk/queryToObj.svg?branch=master)

Converts a javascript object to a url query string


## Installation
```shell
npm install queryToObj --save
```

## Usage
```js
import queryToObj from 'querytoobj';
const obj = queryToObj("Id=3&Name=Example&List=a&List=b&Sub.Prop=S"); 

//Result: 
// { 
//     Id: 3, 
//     Name: 'Example', 
//     List: ['a', 'b'], 
//     Sub: { Prop: 'S' } 
// }

```


## Tests
```shell
npm test
```


## Release History

* 1.0.0 Initial release
