// used as postinstall script
const fs = require('fs');
fs.copyFile('node_modules/iChatBot/iChatBotConfig.js', 'src/iChatBotConfig.js', (err) => {
    if (err) throw err;
    console.log('unable to copy iChatBotConfig.js');
});