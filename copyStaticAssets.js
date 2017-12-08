var shell = require('shelljs');

shell.cp('-R', 'src/index.html', 'dist/src');
shell.cp('-R', 'src/style.css', 'dist/src');


// shell.cp('-R', 'webpack.config.js', 'dist/');
// shell.cp('-R', 'processHTMLHelper.js', 'dist/');
// shell.cp('-R', 'src/public/fonts', 'dist/public/');
// shell.cp('-R', 'src/public/images', 'dist/public/');
