// used as postinstall script for copying config gile
const fs = require('fs');

var path = require('path');
var appDir = path.dirname(require.main.filename).replace("node_modules", "").replace("ichatbot", "");

if (fs.existsSync(appDir + '/src')) {
    fs.copyFile('README.md', appDir + '/src/README.md', (err) => {
        if (err)
            console.log('unable to copy ichatbotconfig.js');
    });
}
else {
    fs.copyFile('README.md', '../../README.md', (err) => {
        if (err)
            console.log('unable to copy ichatbotconfig.js');
    });
}