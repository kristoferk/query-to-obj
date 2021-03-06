
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
const obj = queryToObj("Id=3&Name=Example&EmptyKey=", {
    skipEmptyValues: false,    //If empty string values should be included in object, Default: false 
    keyCase: 'camelCase',      //Convert keys to camelCase, also support for 'PascalCase', 'snake_case' and 'None'. Default: 'None'
    valueCase: 'lowercase',    //Convert values to lowercase, also support for 'UPPERCASE' and 'None'. Default: 'None'
    skipCast: true,            //If values should be casted to other types then strings, Default: false
    decode: true               //If values should be url decoded, Default: false   
}); 

//Result: 
// { 
//     id: '3', 
//     name: 'example'
// }

```



## Tests
```shell
npm test
```


## Release History

* 1.0.0 Initial release
* 1.0.1 Add some optional settings for manipulating case on keys and values
* 1.0.2 Fixed issue with decoding keys [#1](https://github.com/kristoferk/query-to-obj/issues/1)  (Thanks to Eli Doran for reporting issue)
