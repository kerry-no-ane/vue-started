const puppeteer = require("puppeteer");
const ebiPath = "./src/test/ebi/";

(async () => {
  // Browserのインスタンスを作成
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // PuppeteerのAPIを使って、ページ遷移
  await page.goto("http://localhost:8080/");
  // クリック前をスクショ
  await page.screenshot({ path: `${ebiPath}test1.png` });
  // 占うボタンをクリック
  await page.click("#app button");
  // クリック後をスクショ
  await page.screenshot({ path: `${ebiPath}test2.png` });
  // 占うボタンをクリック
  await page.click("#app button");
  // クリック後をスクショ
  await page.screenshot({ path: `${ebiPath}test3.png` });
  // ブラウザを閉じる
  await browser.close();
})();
