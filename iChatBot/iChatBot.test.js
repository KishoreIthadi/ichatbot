const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/iChatBot/Basic-WorkFlow.html');

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

  // Complex-WorkFlow--------------------------------------------------------------------------------------------------------------------------------

  await page.click("#Complex-WorkFlow");
  await page.waitForTimeout(2000);

  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', 'inva', { delay: 700 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', 'lid', { delay: 700 })
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));

  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', 'credit', { delay: 700 })
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.type('#ichatbot-userinput', 'dit', { delay: 700 })

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

  await page.type('#ichatbot-userinput', '9849012', { delay: 700 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', '345678', { delay: 700 })
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.keyboard.press("Backspace", { delay: 700 });
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);

  await page.type('#ichatbot-userinput', 'ichatbot', { delay: 700 })
  await page.keyboard.press(String.fromCharCode(13));
  await page.waitForTimeout(2000);
  await page.type('#ichatbot-userinput', '@gmail.com', { delay: 700 })
  await page.waitForTimeout(2000);
  await page.keyboard.press(String.fromCharCode(13));


  // Reset, Close, Open testing------------------------------------------------------------------------------------------------------------------------------

  await page.click('#ichatbot-reset');
  await page.waitForTimeout(2000);
  await page.click('#ichatbot-close');
  await page.waitForTimeout(2000);
  await page.click('#ichatbot-floating-Icon');
  await page.waitForTimeout(2000);
  await page.click('#ichatbot-close');

  // await browser.close();

})();