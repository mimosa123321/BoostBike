module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        "jsbeautifier" : {
            files : ["src/js/**/*.js"],
            options: {
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        "clean": ['build/'],
        "copy": {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**', '!js/**'],
                    dest: 'build/'
                }]
            }
        },

        "uglify": {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'build/js/main.min.js': ['src/js/lib/jquery-1.11.1.min.js','src/js/lib/imagesloaded/imagesloaded.pkgd.min.js','src/js/websocket/core.js','src/js/lib/WebcamJS/webcam.min.js','src/js/lib/buzz/buzz.min.js','src/js/lib/Stats.js','src/js/model.js','src/js/sound-manager.js','src/js/main.js','src/js/video.js','src/js/camera-manage.js','src/js/tutorial.js','src/js/time-manager.js','src/js/gamescene.js','src/js/tunnels.js','src/js/transitions-manager.js','src/js/ui-elements/speedmeter.js','src/js/ui-elements/game-uielements.js']
                }
            }
        },
        "sed": {
            scripts: {
                path: 'build/index.html',
                pattern: /<!-- DEV START -->.*[\s\S]*<!-- DEV END -->/gm,
                replacement: '<script src="js/main.min.js"></script>',
                recursive: false
            },
            buildtime: {
                path: 'build/js/main.min.js',
                pattern: /\{\{BUILD\}\}/gm,
                replacement: 'Build: ' + new Date().toUTCString(),
                recursive: false
            }
        },
        "pngquant": {
            dist: {
                options: {
                    binary: "/usr/bin/pngquant",
                    verbose: true,
                    speed: 1,
                    quality: 33,
                    preserve: false
                },
                src: ["build/images/**/*.png"]
            }
        },

        pngmin: {
            compile: {
                options: {
                    concurrency: 8,             // specify how many exucutables get spawned in parallel
                    colors: 256,                // reduce colors to 128
                    ext: '.png',                // use .png as extension for the optimized files
                    quality: '65-80',           // output quality should be between 65 and 80 like jpeg quality
                    speed: 10,                  // pngquant should be as fast as possible
                    iebug: false                 // optimize image for use in Internet Explorer 6
                },
                files: [
                    {
                        src: 'src/images/*.png',
                        dest: 'build/images/**/*.png'
                    }
                ]
            }
        },

        "cssmin": {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['font.css','style.css','animate.css','flipclock.css'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        }
    });

    // Combine modules
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks("grunt-pngquant-preserve");
    grunt.loadNpmTasks('grunt-pngmin');

    grunt.registerTask('default', ['jsbeautifier','clean', 'copy', 'cssmin', 'uglify', 'sed','pngmin']);
    //grunt.registerTask('default', ['jsbeautifier','clean', 'copy', 'cssmin', 'uglify', 'sed']);
};