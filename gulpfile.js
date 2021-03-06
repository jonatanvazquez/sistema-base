var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sequence    = require('run-sequence');
var notify      = require('gulp-notify');


// utils
var lazyQuire   = require('./gulp/utils/lazyQuire');
var pumped      = require('./gulp/utils/pumped');
var notifaker   = require('./gulp/utils/notifaker');

// config
var config      = require('./config.json');

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));

/**
 * Html validation
 */
gulp.task('bootlint',      [], lazyQuire(require, './gulp/recipes/html/bootlint'));
gulp.task('htmllint',      [], lazyQuire(require, './gulp/recipes/html/htmllint'));

gulp.task('validate-html', function(done){
  sequence('bootlint', 'htmllint', done);
});

/**
 * Lint
 */
gulp.task('csslint', [], lazyQuire(require, './gulp/recipes/csslint'));
gulp.task('jshint',  [], lazyQuire(require, './gulp/recipes/jshint'));

gulp.task('lint', function(done){
  sequence('csslint','jshint',done);
});

/**
 * Clean
 */
gulp.task('clean-dist',      ['html:clean', 'scripts:clean', 'styles:clean', 'skins:clean', 'examples:clean']);

/**
 * Html distribution
 */
gulp.task('html:clean',    [], lazyQuire(require, './gulp/recipes/html/clean'));
gulp.task('html:dev',      [], lazyQuire(require, './gulp/recipes/html/dev'));
gulp.task('html:prettify', [], lazyQuire(require, './gulp/recipes/html/prettify'));

gulp.task('dist-html', function(done){
  sequence('html:clean', 'html:dev', 'html:prettify', function(){
    done();

    notifaker(pumped('Html Generated!'));
  });
});

/**
 * JS distribution
 */
gulp.task('scripts:clean',       [], lazyQuire(require, './gulp/recipes/scripts/clean'));
gulp.task('scripts:components', [], lazyQuire(require, './gulp/recipes/scripts/components'));
gulp.task('scripts:dev',        [], lazyQuire(require, './gulp/recipes/scripts/dev'));

gulp.task('dist-js', function(done){
  sequence('scripts:clean', 'scripts:components', 'scripts:dev', function(){
    done();

    notifaker(pumped('JS Generated!'));
  });
});

/**
 * CSS distribution
 */
gulp.task('styles:clean',       [], lazyQuire(require, './gulp/recipes/styles/clean'));

gulp.task('styles:bootstrap',   [], lazyQuire(require, './gulp/recipes/styles/bootstrap'));
gulp.task('styles:site',        [], lazyQuire(require, './gulp/recipes/styles/site'));
gulp.task('styles:extend',      [], lazyQuire(require, './gulp/recipes/styles/extend'));

gulp.task('dist-css', function(done){
  sequence('styles:clean', 'styles:bootstrap', 'styles:site', 'styles:extend', function(){
    done();

    notifaker(pumped('CSS Generated!'));
  });
});

/**
 * Skins distribution
 */
gulp.task('skins:clean',     [], lazyQuire(require, './gulp/recipes/skins/clean'));
gulp.task('skins:styles',      [], lazyQuire(require, './gulp/recipes/skins/styles'));

gulp.task('dist-skins', function(done){
  sequence('skins:clean', 'skins:styles', function(){
    done();

    notifaker(pumped('Skins Generated!'));
  });
});

/**
 * Fonts distribution
 */
gulp.task('fonts:clean',     [], lazyQuire(require, './gulp/recipes/fonts/clean'));
gulp.task('fonts:styles',      [], lazyQuire(require, './gulp/recipes/fonts/styles'));

gulp.task('dist-fonts', function(done){
  sequence('fonts:clean', 'fonts:styles', function(){
    done();

    notifaker(pumped('Fonts Generated!'));
  });
});

/**
 * Vendor distribution
 */
gulp.task('vendor:clean',     [], lazyQuire(require, './gulp/recipes/vendor/clean'));
gulp.task('vendor:styles',      [], lazyQuire(require, './gulp/recipes/vendor/styles'));

gulp.task('dist-vendor', function(done){
  sequence('vendor:clean', 'vendor:styles', function(){
    done();

    notifaker(pumped('Vendor Generated!'));
  });
});

/**
 * Full distribution
 */
gulp.task('dist', function(done){
  sequence('dist-html','dist-css','dist-js','dist-skins','dist-fonts','dist-vendor',function(){
    done();

    notifaker(pumped('All Generated!'));
  });
});

/**
 * Static server
 */
gulp.task('serve', [], lazyQuire(require, './gulp/recipes/serve'));

/**
 * Default
 */
gulp.task('default', ['dist-css']);
