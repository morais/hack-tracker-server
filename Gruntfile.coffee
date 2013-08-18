module.exports = (grunt) ->

  grunt.initConfig

    watch:
      emberTemplates:
        files: 'public/src/templates/**/*.hbs'
        tasks: ['emberTemplates:dist']
      coffee:
        files: 'public/src/js/**/*.coffee'
        tasks: ['coffee:dist']
      less:
        files: 'public/src/css/**/*.less'
        tasks: ['less:dist']

    copy:
      dist:
        files: [
          { expand: true, cwd: 'public/src/js/lib/', src: ['*.js'], dest: 'public/js/lib/'}
        ]

    coffee:
      dist:
        files:
          'public/js/application.js': [
            'public/src/js/app.coffee',
            'public/src/js/controllers/*.coffee',
            'public/src/js/store.coffee',
            'public/src/js/models/*.coffee',
            'public/src/js/routes/*.coffee',
            'public/src/js/views/*.coffee',
            'public/src/js/router.coffee'
          ]

    clean:
      dist:
        files: [{
          src: [ 'public/js/*', 'public/css/*']
        }]

    emberTemplates:
      dist:
        options:
          templateName: (sourcefile) ->
            sourcefile.replace /public\/src\/templates\//, ''
        files:
          'public/js/compiled-templates.js':'public/src/templates/**/*.hbs'

    less:
      dist:
        options:
          compress: true
          paths: ['public/src/css']
        files:
          'public/css/app.css': 'public/src/css/application.less'



  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask 'build', ['emberTemplates', 'coffee:dist', 'less:dist', 'copy:dist']

  grunt.registerTask 'default', ['clean', 'build', 'watch']

  grunt.registerTask 'heroku', ['build']
