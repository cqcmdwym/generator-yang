'use strict';

var generators = require('yeoman-generator');

module.exports = generators.extend({
    constructor: function() {
        generators.apply(this, arguments);
    },

    initializing: function() {
        this.log('initializing');
    },
    prompting: {
        method1: function() {
            this.log('in prompting1');
        },
        method2: function() {
            this.log('in prompting2');
        }
    },
    configuring: function() {
        this.log('configuring');
    },
    default: function() {
        this.log('default');
    },
    writing: function() {
        this.log('writing');
    },
    conflicts: function() {
        this.log('conflicts');
    },
    install: function() {
        this.log('install');
    },
    end: function() {
        this.log('end');
    },
    myCustomMethpd: function() {
        this.log('**custom');
    }
});