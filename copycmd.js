// used as postinstall script
const fs = require('fs');

if (fs.existsSync('./src')) {
    fs.copyFile('node_modules/ichatbot/ichatbotconfig.js', 'src/ichatbotconfig.js', (err) => {
        if (err) throw err;
        console.log('unable to copy ichatbotconfig.js');
    });
}
else {
    fs.copyFile('node_modules/ichatbot/ichatbotconfig.js', 'ichatbotconfig.js', (err) => {
        if (err) throw err;
        console.log('unable to copy ichatbotconfig.js');
    });
}