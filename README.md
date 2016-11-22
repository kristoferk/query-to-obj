
# query-to-obj

![](https://api.travis-ci.org/kristoferk/query-to-obj.svg?branch=master)

Converts a javascript object to a url query string. Supports lists and nested objects.


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



## Optional settings
```js
import queryToObj from 'query-to-obj';
const obj = queryToObj("Id=3&Name=Example&EmptyKey=Example", {
    skipEmptyValues: false,    //If empty string values should be included in object, Default: false 
    case: 'camelCase',         //Convert keys to camelCase, also support for 'PascalCase' and 'snake_case'. Default: 'None'
    skipCast: true,            //If values should be casted to other types then strings, Default: false
    decode: true               //If values should be url decoded, Default: false   
}); 

//Result: 
// { 
//     id: '3', 
//     name: 'Example'
// }

```



## Tests
```shell
npm test
```


## Release History

* 1.0.0 Initial release
