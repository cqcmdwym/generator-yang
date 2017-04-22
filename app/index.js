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
    writing: {
        gulpfile: function() {

        },
        packageJson: function() {

        },
        git: function() {

        },
        bower: function() {
            var bowerJson = {
                name: 'my-app',
                license: 'MIT',
                dependencies: {}
            }
            bowerJson.dependencies['angular'] = '~1.4.6';
            bowerJson.dependencies['moment'] = '~2.10.6';
            this.fs.writeJSON('src/bower.json', bowerJson);
        },
        appStaticFiles: function() {
            // this.log('Template path: ' + this.templatePath());
            // this.log('Destination path: ' + this.destinationPath());
            var source = this.templatePath('_yeoman.ico');
            var destination = this.destinationPath('src/yeoman.ico');
            // this.log('Source:' + source);
            // this.log('Destination' + destination);
            this.fs.copy(source, destination);
            this.fs.copy(this.templatePath('styles'), this.destinationPath('src/styles'));
        },
        scripts: function() {
            this.fs.copyTpl(
                this.templatePath('app/_app.js'),
                this.destinationPath('src/app/app.js'), {
                    ngapp: 'myapp'
                }
            );
        },
        html: function() {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html'), {
                    appname: 'My Cool App',
                    ngapp: 'myapp'
                }
            );
        }
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