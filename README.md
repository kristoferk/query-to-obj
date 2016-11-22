
# query-to-obj

![](https://api.travis-ci.org/kristoferk/query-to-obj.svg?branch=master)

Converts a javascript object to a url query string


## Installation
```shell
npm install query-to-obj --save
```

## Usage
```js
import queryToObj from 'query-to-obj';
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
