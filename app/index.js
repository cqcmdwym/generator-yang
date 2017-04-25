'use strict';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = generators.extend({
    constructor: function() {
        generators.apply(this, arguments);
        this.argument('appname', { type: String, required: true });
        //this.log('appname (arg):' + this.appname);
        this.appname = _.kebabCase(this.options.appname);

        this.option('includeutils', {
            desc: 'Optionally include Angular-UI Utils Library.',
            type: Boolean,
            default: false
        })
    },

    initializing: function() {
        this.log('initializing');
    },
    prompting: function() {
        this.log(yosay('Welcome to ' + chalk.yellow('YANG(Yet Another Angular)') + ' generator!'));
        //var done = this.async();
        // this.prompt({
        //     type: 'input',
        //     name: 'ngappname',
        //     message: 'Angular App Name (ng-app)',
        //     default: 'app'
        // }, function(answers) {
        //     this.log('testtttt');
        //     this.log(answers.ngappname);
        //     done();
        // }.bind(this));

        var self = this;
        return this.prompt([{
            type: 'input',
            name: 'ngappname',
            message: 'Angular App Name (ng-app)',
            default: 'app'
        }, {
            type: 'checkbox',
            name: 'jslibs',
            message: 'Which JS libraries would you like to include?',
            choices: [{
                    name: 'lodash',
                    value: 'lodash',
                    checked: true
                },
                {
                    name: 'Moment.js',
                    value: 'momentjs',
                    checked: true
                },
                {
                    name: 'Angular-UI Utils',
                    value: 'angularuiutils',
                    checked: true
                }
            ]
        }]).then(function(answers) {
            self.log(answers);
            self.ngappname = answers.ngappname;
            self.includeLodash = _.includes(answers.jslibs, 'lodash');
            self.includeMoment = _.includes(answers.jslibs, 'momentjs');
            self.includeAngularUIUtils = _.includes(answers.jslibs, 'angularuiutils');
        });
    },
    configuring: function() {
        this.log('configuring');
    },
    default: function() {
        this.log('default');
    },
    writing: {
        gulpfile: function() {
            this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('src/gulpfile.js'));
            this.fs.copy(this.templatePath('_gulp.config.js'), this.destinationPath('src/gulp.config.js'));
            this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('src/.jshintrc'));
        },
        packageJson: function() {
            this.fs.copy(this.templatePath('_package.json'), this.destinationPath('src/package.json'));
        },
        git: function() {
            this.fs.copy(this.templatePath('gitignore'), this.destinationPath('src/.gitignore'));
        },
        bower: function() {
            var bowerJson = {
                name: this.appname,
                license: 'MIT',
                dependencies: {}
            }
            if (this.includeLodash) {
                bowerJson.dependencies['lodash'] = '~3.10.1';
            }
            bowerJson.dependencies['angular'] = '~1.4.6';
            if (this.includeMoment) {
                bowerJson.dependencies['moment'] = '~2.10.6';
            }
            if (this.options.includeutils) {
                bowerJson.dependencies['angular-ui-utils'] = '~3.0.0';
            }
            this.fs.writeJSON('src/bower.json', bowerJson);
            this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('src/.bowerrc'));
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
                    ngapp: this.ngappname
                }
            );
        },
        html: function() {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html'), {
                    appname: _.startCase(this.appname),
                    ngapp: this.ngappname
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