'use strict';

module.exports = function(grunt) {
  var appcfg = {
    app: __dirname,
    src: 'src',
    build: 'build'
  };


  var file = {
    appcfg: appcfg,
    // Clean Files to build
    clean: {
      api: {
        files: [{
          dot: true,
          src: [
            '<%= appcfg.build %>/server/{,*/}*',
            '!<%= appcfg.build %>/.git{,*/}*'
          ]
        }]
      },
      client: {
        files: [{
          dot: true,
          src: [
            '<%= appcfg.build %>/client/{,*/}*',
            '!<%= appcfg.build %>/.git{,*/}*'
          ]
        }]
      },
      admin: {
        files: [{
          dot: true,
          src: [
            '<%= appcfg.build %>/admin/{,*/}*',
            '!<%= appcfg.build %>/.git{,*/}*'
          ]
        }]
      }
    },
    // Copy Files to build
    copy: {
      api: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appcfg.src %>',
          dest: '<%= appcfg.build %>',
          src: [
            'server/*.js',
            'server/modules/**',
            'server/models/**',
            'server/bin/www',
            'server/{,*/}*.js',
            'server/.env'
          ]
        }]
      },
      client: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appcfg.src %>',
          dest: '<%= appcfg.build %>',
          src: [
            'client/*.html',
            'client/components/**',
            'client/favicon/**',
            'client/modules/**',
            'client/static/**',
            'client/{,*/}*.html'
          ]
        }]
      },
      admin: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appcfg.src %>',
          dest: '<%= appcfg.build %>',
          src: [
            'admin/*.html',
            'admin/components/**',
            'admin/favicon/**',
            'admin/modules/**',
            'admin/static/**',
            'admin/{,*/}*.html'
          ]
        }]
      },
      dependence: {
        files: [{
          expand: true,
          dot: true,
          cwd: './bower_modules',
          dest: '<%= appcfg.build %>/client/bower_modules',
          src: [
            '**',
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: './bower_modules',
          dest: '<%= appcfg.build %>/admin/bower_modules',
          src: [
            '**',
          ]
        }]
      }
    },
    // inject dependencies into index.html
    wiredep: {
      target: {
        src: [
          '<%= appcfg.build %>/client/index.html'
        ]
      }
    },
    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appcfg.src %>/server/{,*/}{,*/}{,*/}{,*/}*.js',
          '!<%= appcfg.src %>/client/static/js/epub.min.js',
          '!<%= appcfg.src %>/client/static/js/zip.min.js',
          '!<%= appcfg.src %>/client/static/js/checkout.js',
          '!<%= appcfg.src %>/client/static/reader/**',
          '<%= appcfg.src %>/client/{,*/}{,*/}{,*/}{,*/}*.js'
        ]
      },
      api: {
        src: [
          '<%= appcfg.src %>/server/{,*/}{,*/}{,*/}{,*/}*.js'
        ]
      },
      client: {
        src: [
          '<%= appcfg.src %>/client/{,*/}{,*/}{,*/}{,*/}*.js',
          '!<%= appcfg.src %>/client/static/js/epub.min.js',
          '!<%= appcfg.src %>/client/static/js/zip.min.js',
          '!<%= appcfg.src %>/client/static/js/checkout.js',
          '!<%= appcfg.src %>/client/static/reader/**',
        ]
      },
      admin: {
        src: [
          '<%= appcfg.src %>/admin/{,*/}{,*/}{,*/}{,*/}*.js'
        ]
      }
    },
    // code style
    eslint: {
      options: {
        configFile: '.eslintrc.yml'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appcfg.src %>/server/{,*/}{,*/}{,*/}{,*/}*.js',
          '<%= appcfg.src %>/client/{,*/}{,*/}{,*/}{,*/}*.js',
          '!<%= appcfg.src %>/client/static/js/epub.min.js',
          '!<%= appcfg.src %>/client/static/js/checkout.js',
          '!<%= appcfg.src %>/client/static/js/zip.min.js',
          '!<%= appcfg.src %>/client/static/reader/**'
        ]
      },
      api: {
        src: [
          '<%= appcfg.src %>/server/{,*/}{,*/}{,*/}{,*/}*.js'
        ]
      },
      client: {
        src: [
          '<%= appcfg.src %>/client/{,*/}{,*/}{,*/}{,*/}*.js',
          '!<%= appcfg.src %>/client/static/reader',
          '!<%= appcfg.src %>/client/static/js/epub.min.js',
          '!<%= appcfg.src %>/client/static/js/checkout.js',
          '!<%= appcfg.src %>/client/static/js/zip.min.js',
          '!<%= appcfg.src %>/client/static/reader/**.js'

        ]
      },
      admin: {
        src: [
          '<%= appcfg.src %>/admin/{,*/}{,*/}{,*/}{,*/}*.js'
        ]
      }
    }

  };

  grunt.initConfig(file);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('api', [
    'jshint:api',
    'eslint:api',
    'clean:api',
    'copy:api'
  ]);

  grunt.registerTask('client', [
    'jshint:client',
    'eslint:client',
    'clean:client',
    'copy:client',
    'copy:dependence',
    'wiredep'
  ]);

  grunt.registerTask('admin', [
    'jshint:admin',
    'eslint:admin',
    'clean:admin',
    'copy:admin',
    'copy:dependence',
    'wiredep'
  ]);

  grunt.registerTask('check', [
    'jshint:all',
    'eslint:all'
  ]);

  grunt.registerTask('build', [
    'api',
    'client'
  ]);

};
