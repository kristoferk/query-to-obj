(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.queryToObj = factory();
    }
}(this, function () {
    function queryToObj(str, options){
        options = options || {};
        str = str || document.location.search;

        var applyCaseOnKey = function(key) {
            if (options.keyCase)
            {
                if (options.keyCase.toLowerCase() === 'camelcase') {
                    key = toCamelCase(key);
                }

                if (options.keyCase.toLowerCase() == 'pascalcase') {
                    key = toPascalCase(key);
                }

                if (options.keyCase.toLowerCase() == 'snake_case' || options.keyCase.toLowerCase() == 'snakecase') {
                    key = toSnakeCase(key);
                }
            }

            return key;
        }

        var ensureKeys = function (arr, obj) {
            var lastObj = obj;

            for(var parts = arr, i=0, l=parts.length-1, cache=obj; i<l; i++) {

                var key = parts[i];

                if ( options.decode) {
                    key = decodeURIComponent(key);
                }
                
                key = applyCaseOnKey(key);

                if(!cache[key]) {
                    cache[key] = {};
                }
                cache = cache[key];

                lastObj = cache;
            }

            return lastObj;
        }

        toCamelCase = function(str) {
            return str
                //SnakeCase to PamelCase
                .replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})
                //First letter lower
                .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
        }

        toPascalCase = function(str) {
            return str
                //SnakeCase to PamelCase
                .replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})
                //First letter upper case
                .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
        }

        toSnakeCase = function(str) {
            return str
                //camelCase to SnakeCase
                .replace(/([a-z][A-Z])/g, function(m){ return m[0] + '_' + m[1] }).toLowerCase();
        }

        var pushValueOnObject = function (obj, key, val) {
            if ( options.decode) {                
                val = decodeURIComponent(val);
            }

            key = applyCaseOnKey(key);

            if ( options.valueCase) {
                if ( options.valueCase.toLowerCase() === 'lowercase') {                
                    val = val.toLowerCase();
                }

                if ( options.valueCase.toUpperCase() === 'UPPERCASE') {                
                    val = val.toUpperCase();
                }
            }

            if (!options.skipCast) {
                // simple float regex
                if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) {
                    val = parseFloat(val);
                }  
                // simple int regex
                else if (/^[+-]?[1-9][0-9]*$/.test(val)) {
                    val = parseInt(val, 10);
                }
                else if (val === 'true' || val === 'True') {
                    val = true;
                }
                else if (val === 'false' || val === 'False') {
                    val = false;
                }
            }       

            if (!obj[key]) {
                obj[key] = val;
            }
            else if ( typeof obj[key] === "object" ) {
                //Add third+n value to array
                obj[key].push(val);
            }
            else {
                //Add second value to array
                obj[key] = [obj[key], val];
            }

            return obj;
        }

        var mapKeys = function(n) {
            n = n.split("=");
            var key = n[0];
            var val = n[1];
            var obj = this;

            if (options.skipEmptyValues && val === '') {
                return n, obj, this;
            }

            if (!this[key] && key.indexOf(".") > 0) {
                //Handle nested object
                var s = key.split(".");
                if ( options.decode) {
                    for (i = 0; i < s.length; i++) { 
                        s[i] = decodeURIComponent(s[i]);
                    }
                }

                var t = ensureKeys(s, obj);
                pushValueOnObject(t, s[s.length-1], val);
            }
            else {    
                //Handle key value and arrays
                pushValueOnObject(obj, key, val);
            }

            return n, obj, this;
        };

        var bindedFunction = mapKeys.bind({});

        return (!str && {}) || str.replace(/(^\?)/, "").split("&").map(bindedFunction)[0];
    };

    return queryToObj;
}));