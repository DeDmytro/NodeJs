var colors = require('colors');
var u  = require('underscore');
// console.log('Hello world!' . rainbow);
require('libraries/sugar.js');
var argv = require('minimist')(process.argv.slice(2));
var util = require('util');

console.log(
    util.inspect({
            test: 1,
            key: 23,
            arr: [1,2,3,4,5,6]
        }, {depth:null})
        . rainbow);

console.log(u.isUndefined(undefined));
console.dir(argv);
