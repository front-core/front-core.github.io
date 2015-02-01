'use strict';

//------------------------------------------------------------------------------
//
//  Initialize
//
//------------------------------------------------------------------------------

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

//--------------------------------------
//  Constants
//--------------------------------------

  var CONNECT_HOST = grunt.option('connect-host') || '0.0.0.0';
  var CONNECT_PORT = grunt.option('connect-port') || 9001;
//   var PROXY_PORT = grunt.option('proxy-port') || 4000;

  var LIVERELOAD_PORT = grunt.option('livereload-port') || 35731;

//--------------------------------------
//  Plugin tasks configuration
//--------------------------------------

  grunt.initConfig({

    path: {
      tmp: '.tmp',
      tmpImages: '<%= path.tmp %>/images',
      app: 'public',
      appResources: 'public-resources',
      appImages: '<%= path.appResources %>/images',
      appStyles: '<%= path.appResources %>/styles',
      appScripts: '<%= path.appResources %>/scripts',
      dist: 'public-dist',
      distImages: '<%= path.dist %>/images',
      distStyles: '<%= path.dist %>/styles',
      distScripts: '<%= path.dist %>/scripts'
    },

    connect: {
      options: {
        hostname: CONNECT_HOST
      },
      livereload: {
        options: {
          port: CONNECT_PORT,
          livereload: LIVERELOAD_PORT,
          middleware: function(connect) {
            return [
              connect.static(require('path').resolve(grunt.config('path.app'))),
              connect.static(require('path').resolve(grunt.config('path.appResources'))),
//               connect.static(require('path').resolve('.')),
//               require('grunt-connect-proxy/lib/utils').proxyRequest
            ]
          }
        }
      },
//       proxies: [
//         {
//           connect: '/',
//           host: CONNECT_HOST,
//           port: PROXY_PORT,
//           https: false,
//           changeOrigin: false
//         }
//       ],
      dist: {
        options: {
          port: CONNECT_PORT,
          middleware: function (connect) {
            return [
              connect.static(require('path').resolve(grunt.config('path.dist')))
            ];
          }
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= path.appImages %>/**/*.{png,jpg,gif,svg}',
          '<%= path.appStyles %>/**/*.css',
          '<%= path.appScripts %>/**/*.js',
          '<%= path.app %>/**/*.html',
          '!<%= path.app %>/bower_components/**/*'
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= path.dist %>'
          ]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.app %>',
          dest: '<%= path.dist %>',
          src: [
            '**/*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= path.appResources %>',
          dest: '<%= path.dist %>',
          src: [
            '*.{ico,png}',
            'assets/**/*',
            '!bower_components/**',
            '!styleguide/**',
            '!styleguide-template/**'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= path.tmpImages %>',
          dest: '<%= path.distImages %>',
          src: [
            '**/*.{png,jpg,gif,svg}'
          ]
        }]
      }
    },

    useminPrepare: {
      html: '<%= path.app %>/ja/index.html',
      options: {
        dest: '<%= path.dist %>',
        flow: {
          steps: {
            js: ['concat', 'uglifyjs'],
            css: ['concat']
          },
          post: {}
        }
      }
    },

    filerev: {
      images: {
        src: '<%= path.distImages %>/**/*.{png,jpg,gif,svg}'
      },
      styles: {
        src: '<%= path.distStyles %>/**/*.css'
      },
      scripts: {
        src: '<%= path.distScripts %>/**/*.js'
      }
    },

    usemin: {
      options: {
        assetsDirs: ['<%= path.dist %>', '<%= path.distStyles %>']
      },
      html: [
        '<%= path.dist %>/**/*.html',
        '!<%= path.dist %>/bower_components/**/*.html'
      ],
      css: '<%= path.distStyles %>/**/*.css'
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.dist %>',
          src: [
            '**/*.html'
          ],
          dest: '<%= path.dist %>'
        }]
      }
    },

    image: {
      dist: {
        options: {
          pngquant: true,
          optipng: true,
          advpng: true,
          zopflipng: true,
          pngcrush: true,
          pngout: true,
          jpegtran: true,
          jpegRecompress: true,
          jpegoptim: true,
          gifsicle: true,
          svgo: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.appImages %>',
          src: '**/*.{png,jpg,gif,svg}',
          dest: '<%= path.tmpImages %>',
        }]
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true
      },

      compassCompile: {
        command: 'bundle exec compass compile -c config-build.rb --force'
      },
      compassWatch: {
        command: 'bundle exec compass watch'
      },

      rakeGenerate: {
        command: 'bundle exec rake generate'
      },
      rakeWatch: {
        command: 'bundle exec rake watch'
      },
      rakeDeploy: {
        command: 'mkdir -p _deploy && bundle exec rake deploy'
      },

      deployToGitHubPage: {
        command: 'git subtree push --prefix <%= path.dist %> origin master'
      },
      dropGitHubPageBranch: {
        command: 'git push origin :master'
      },

      copyIndexHtml: {
        command: 'cp <%= path.dist %>/ja/index.html <%= path.dist %>/index.html'
      },

      styleguide: {
        command: 'mkdir -p <%= path.app %>/styleguide; node_modules/kss/bin/kss-node <%= path.appStyles %>/sass <%= path.app %>/styleguide -t styleguide-template --css <%= path.appStyles %>/main.css'
      }
    }

  }); // grunt.initConfig

//--------------------------------------
//  Register tasks
//--------------------------------------

  // Serve task
  grunt.registerTask('serve', 'Launch local web server and enable live-reloading.', function(target) {
    var tasks;

    if (target === 'dist') {
      tasks = [
        'connect:dist:keepalive'
      ];
    } else {
      tasks = [
        //'configureProxies',
        'shell:rakeWatch',
        'shell:compassWatch',
        'connect:livereload',
        'watch'
      ];
    }

    grunt.config('shell.rakeWatch.options.async', true);
    grunt.config('shell.compassWatch.options.async', true);

    grunt.task.run(tasks);
  });

  // Build task
  grunt.registerTask('build', 'Minify CSS/JS/HTML and revisioning all static files.', function() {
    var tasks = [
      'shell:rakeGenerate',
      'shell:compassCompile',
      'clean:dist',
      'newer:image:dist',
      'copy:build',
      'useminPrepare',
      'concat',
      // 'cssmin', flexbox など破綻した仕様の CSS を消してしまうので Sass の output-style で対応
      'filerev:images',
      'usemin:css',
      'uglify',
      'filerev:styles',
      'filerev:scripts',
      'usemin:html',
      'htmlmin:dist',
      'shell:copyIndexHtml'
    ];

    grunt.task.run(tasks);
  });

  // Deploy task
  grunt.registerTask('deploy', 'Deploy to GitHub Page.', function(target) {
    var tasks = [
      'build',
      'shell:rakeDeploy' // rakeDeploy の方が早い 
      // 'shell:deployToGitHubPage',
    ];

    if (target === 'force') {
      tasks.unshift('shell:dropGitHubPageBranch');
    }
    
    grunt.task.run(tasks);
  });

  // Default task
  grunt.registerTask('default', [
    'build'
  ]);

};
