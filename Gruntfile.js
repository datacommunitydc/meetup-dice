module.exports = function(grunt) {
  
  var pkg = grunt.file.readJSON('package.json'),
      grnt = grunt.file.readJSON('grunt.json');

  grunt.initConfig({
    pkg: pkg,
    concat: {
      options: {
        separator: "\n;"
      },
      dist: {
        src: grnt.concat_src.bower_components,
        dest: 'public/scripts/bower_components.js'
      }
    },
    copy: {
      main: {
        files: grnt.copy_files
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'copy']);

};
