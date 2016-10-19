// querytoobj
// ------------
// v1.0.0
//
// Copyright (c) 2012-2016 Kristofer Karlsson
// Distributed under MIT license
//
// http://github.com/kristoferk/queryToObj

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
        str = str || document.location.search;

        return (!str && {}) || str.replace(/(^\?)/, "").split("&").map(function (n) {
            return n = n.split("="),
            (!this[n[0]] ? this[n[0]] = n[1] : ((typeof this[n[0]] === "object") ? this[n[0]].push(n[1]) : this[n[0]] = [this[n[0]], n[1]])),
            this;
        }.bind({}))[0];
    };

    return queryToObj;
}));