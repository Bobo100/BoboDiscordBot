const puppeteer = require("puppeteer");
// (async () => {
//   const pathToExtension = require("path").join(__dirname, "my-extension");
//   const browser = await puppeteer.launch({
//     headless: "chrome",
//     args: [
//       `--disable-extensions-except=${pathToExtension}`,
//       `--load-extension=${pathToExtension}`,
//     ],
//   });
//   //   const backgroundPageTarget = await browser.waitForTarget(
//   //     target => target.type() === 'background_page'
//   //   );
//   //   const backgroundPage = await backgroundPageTarget.page();
//   // Test the background page as you would any other page.
//   //   await browser.close();
// })();

// console.log("done");

const PCR = require("puppeteer-chromium-resolver");
const pathToExtension = require("path").join(__dirname, "my-extension");

const option = {
  revision: "",
  detectionPath: "",
  folderName: ".chromium-browser-snapshots",
  defaultHosts: [
    "https://storage.googleapis.com",
    "https://npm.taobao.org/mirrors",
  ],
  hosts: [],
  cacheRevisions: 2,
  retry: 3,
  silent: false,
};

(async () => {
  const stats = await PCR(option);
  const browser = await stats.puppeteer
    .launch({
      headless: false,
      args: [
        "--no-sandbox",
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
      executablePath: stats.executablePath,
    })
    .catch(function (error) {
      console.log(error);
    });
})();
