const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/iChatBot/example.html');
  await page.waitForTimeout(2000);

  // Bacis-WorkFlow----------------------------------------------------------------------------------------------------------------------

  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);

  await page.click("span[id='101']");
  await page.waitForTimeout(2000);
  await page.click("span[id='105']");
  await page.waitForTimeout(2000);
  const links = await page.$$('a')
  for (var i = 0; i < links.length; i++) {
    let text = await links[i].getProperty('innerText');
    let linkText = await text.jsonValue();
    if (linkText == "Link1" || linkText == "Link2") {
      await links[i].click();
    }
  }

  await page.waitForTimeout(2000);
  await page.click("span[id='109']");
  await page.waitForTimeout(2000);

  await page.click('#ichatbot-reset');
  await page.waitForTimeout(2000);
  await page.click('#ichatbot-close');
  await page.waitForTimeout(2000);

  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);

  await page.click("span[id='101']");
  await page.waitForTimeout(2000);
  await page.click("span[id='105']");
  await page.waitForTimeout(2000);
  await page.click("span[id='108']");
  await page.waitForTimeout(2000);
  let elements = await page.$$("span[id='101']");
  await elements[1].click();
  await page.waitForTimeout(2000);
  elements = await page.$$("span[id='105']");
  await elements[1].click();
  await page.waitForTimeout(2000);
  elements = await page.$$("span[id='109']");
  await elements[1].click();
  await page.waitForTimeout(2000);

  // // Complex-WorkFlow--------------------------------------------------------------------------------------------------------------------------------

  await page.click("#btn_cwf");
  await page.waitForTimeout(2000);

  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', 'inva', { delay: 500 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', 'lid', { delay: 500 })
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));

  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', 'credit', { delay: 500 })
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.type('#ichatbot-userinput', 'dit', { delay: 500 })

  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.click("span[id='101']");
  await page.click("span[id='102']");
  await page.waitForTimeout(2000);
  await page.click("span[id='104']");
  await page.click("span[id='103']");
  await page.waitForTimeout(2000);
  await page.click("span[id='105']");
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', '9849012', { delay: 500 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', '345678', { delay: 500 })
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', 'ichatbot', { delay: 500 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', '@gmail.com', { delay: 500 })
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));

  // File-Upload-WorkFlow--------------------------------------------------------------------------------------------------------------------------------

  await page.click("#btn_fuwf");
  await page.waitForTimeout(2000);

  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);

  await page.click("span[id='101']");
  await page.waitForTimeout(2000);
  await page.click("span[id='104']");
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', '9849012', { delay: 500 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', '345678', { delay: 500 })
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.keyboard.press("Backspace", { delay: 500 });
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);

  const inputUploadHandle = await page.$('input[type=file]');
  inputUploadHandle.uploadFile('D:/Projects/iChatbot/iChatBot/dataset-Basic-WorkFlow.js');
  await page.waitForTimeout(2000);
  await page.focus("#ichatbot-userinput");
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(5000);

  // Reset, Close, Open testing------------------------------------------------------------------------------------------------------------------------------

  // await page.click('#ichatbot-reset');
  // await page.waitForTimeout(000);
  // await page.click('#ichatbot-close');
  // await page.waitForTimeout(2000);
  // await page.click('#ichatbot-floating-Icon');
  // await page.waitForTimeout(2000);
  // await page.click('#ichatbot-close');

  // await browser.close();

})();