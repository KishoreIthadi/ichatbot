// used as postinstall script for copying config gile
const fs = require('fs');

var path = require('path');
var appDir = path.dirname(require.main.filename).replace("node_modules", "").replace("innovative-chatbot", "");

if (fs.existsSync(appDir + '/src')) {
    fs.copyFile('ichatbotconfig.js', appDir + '/src/ichatbotconfig.js', (err) => {
        if (err)
            console.log('unable to copy ichatbotconfig.js');
    });
}
else {
    fs.copyFile('ichatbotconfig.js', appDir + '/ichatbotconfig.js', (err) => {
        if (err)
            console.log('unable to copy ichatbotconfig.js');
    });
}