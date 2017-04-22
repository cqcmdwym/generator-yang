'use strict';

var generators = require('yeoman-generator');
var MyBase = generators.extend({
    anotherHelper: function() {
        console.log('inside another helper');
    }
});

module.exports = MyBase.extend({
    constructor: function() {
        generators.apply(this, arguments);
    },

    init: function() {
        this.log('inside init');
        this.baz = function() {
            this.log('inside baz');
        }
    },

    _foo: function() {
        this.log('inside foo');
    },

    bar: function() {
        this.log('inside bar');
        this._foo();
        this.baz();
        this.anotherHelper();
    }
});