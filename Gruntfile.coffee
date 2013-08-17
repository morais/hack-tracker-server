module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    recess:
      dist:
        options:
          compile: true
          compress: true
        files:
          'client/css/application.css': [
            'assets/css/application.less'
          ]

  grunt.loadNpmTasks 'grunt-recess'

  grunt.registerTask 'default', ['recess']