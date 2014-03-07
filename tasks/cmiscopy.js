/*
 * grunt-cmiscopy
 * https://github.com/marushkevych/grunt-cmiscopy
 *
 * Copyright (c) 2014 Andrey Marushkevych
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var createTask = require('../js/CmisCopyFactory');

    grunt.registerTask('cmiscopy', 'copy files and folders to and from CMS', function(specificPath, action) {

        var done = this.async();
        var options = this.options();

        var cmisCopytask = createTask(options, specificPath, action);

        cmisCopytask.runTask(function(err) {
            if (err) {
                grunt.log.error();
                grunt.log.error(err);
            }
            done(err == null);
        });
    });
};