var shell = require('shelljs');

shell.cp('-R', 'src/index.html', 'dist/src');
shell.cp('-R', 'src/style.css', 'dist/src');