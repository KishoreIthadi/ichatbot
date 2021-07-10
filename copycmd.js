// used as postinstall script
const fs = require('fs');
fs.copyFile('node_modules/ichatbot/ichatbotConfig.js', 'src/ichatbotConfig.js', (err) => {
    if (err) throw err;
    console.log('unable to copy ichatbotConfig.js');
});