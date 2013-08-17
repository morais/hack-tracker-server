module.exports = (grunt) ->

  grunt.initConfig

    watch:
      emberTemplates:
        files: 'public/src/templates/{,*}*.hbs'
        tasks: ['emberTemplates']
      coffee:
        files: 'public/src/js/{,*}*.coffee'
        tasks: ['coffee:dist']
      less:
        files: 'public/src/css/{,*}*.less'
        tasks: ['less:development']

    coffee:
      dist:
        files: [{
          expand: true
          cwd: 'public/src/js'
          src: '{,*}*.coffee'
          dest: 'public/js'
          ext: '.js'
        }]

    clean:
      dist:
        files: [{
          src: [ 'public/js/*', 'public/css/*']
        }]

    emberTemplates:
      dist:
        options:
          templateName: (sourcefile) ->
            sourcefile.replace /public\/src\/templates/, ''
        files:
          'public/js/compiled-templates.js':'public/src/templates/{,*}*.hbs'

    less:
      dist:
        options:
          compress: true
          paths: ['public/src/css']
        files:
          'public/css/app.css': 'public/src/css/application.less'



  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask 'default', ['clean', 'watch']

  grunt.registerTask 'heroku', ['emberTemplates', 'coffee:dist', 'less:dist']
