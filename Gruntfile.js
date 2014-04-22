module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner :"/*Puta madre mother fuckers!!*/",
        jshint: {
            all: {
                src: ['**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                src:['../dist/**/*.js'],
                dest:"../app/<%= pkg.name %>.<%= pkg.version %>.min.js"
            }
        },
        compass:{
            dist:{
                options: {
                    config: 'config.rb'
                }
            }
        },
        cssmin:{
            compress:{
                options:{
                    banner : '<%= banner %>'
                },
                files:{
                    'resources/css/app.min.css' : ['resources/css/*.css']
                }
            }
        }

    });

    //minification
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //code quality
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //css minify
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //compass
    grunt.loadNpmTasks('grunt-contrib-compass');
    //watch????
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //concatination
    //grunt.loadNpmTasks('grunt-contrib-concat');


    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['uglify','compass','cssmin']);

    grunt.registerTask('css', ['compass','cssmin']);
}