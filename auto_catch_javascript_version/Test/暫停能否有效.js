const puppeteer = require("puppeteer");
const PCR = require("puppeteer-chromium-resolver");

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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
first_time_login();

async function first_time_login() {
  const stats = await PCR(option);
  const browser = await stats.puppeteer
    .launch({
      headless: false,
      args: ["--no-sandbox"],
      executablePath: stats.executablePath,
    })
    .catch(function (error) {
      console.log(error);
    });

  let pages = await browser.pages();
  page = pages[0];
  await page.goto("https://www.google.com.tw/");
  await delay(3000);
  myTimer();
}

let running_flag = true;
function myTimer() {
  myInterval = setInterval(() => enter_sned_message(), 2000);
}

function enter_sned_message() {
  page.keyboard.type("sdfsdf");
  page.keyboard.press("Enter");
  console.log("自動輸入中，ctrl+x可以暫停，ctrl+c可以關閉程式");
}

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
  console.log("running_flag: " + running_flag);
  if (key.ctrl && key.name == "x" && running_flag == true) {
    running_flag = false;
    console.log("暫停，ctrl+z可以繼續");
    clearInterval(myInterval);
  }
  if (key.ctrl && key.name == "z" && running_flag == false) {
    running_flag = true;
    console.log("重新自動輸入，ctrl+x可以暫停");
    myTimer();
  }
  if (key.ctrl && key.name == "c") process.exit();
});
