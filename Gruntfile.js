module.exports = function(grunt) {
  
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    concat: {
      options: {
        separator: "\n;"
      },
      dist: {
        src: pkg.concat_src,
        dest: 'public/scripts/bower_components.js'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/animate.css/',
            src: ['animate.css'],
            dest: 'public/stylesheets/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'copy']);

};
