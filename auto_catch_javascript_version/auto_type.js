const puppeteer = require("puppeteer");
const prompts = require("prompts");
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

const questions = [
  {
    type: "text",
    name: "username",
    message: "請輸入DC帳號",
  },
  {
    type: "text",
    name: "userpassword",
    message: "請輸入DC密碼",
  },
  {
    type: "confirm",
    name: "otp",
    message: "你有OTP嗎",
    initial: false,
  },
  {
    type: "confirm",
    name: "value",
    message: "要開啟瀏覽器嗎",
    initial: false,
  },
  {
    type: "text",
    name: "channel_url",
    message: "要刷頻道的網址",
    initial:
      "https://discord.com/channels/323890489856229376/1048935188761157632",
    // https://discord.com/channels/771365222476808193/1048262931021832299
  },
];

let page;
let myInterval;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

first_time_login();

async function first_time_login() {
  const response = await prompts(questions);
  console.log("login now");
  const stats = await PCR(option);
  const browser = await stats.puppeteer
    .launch({
      headless: !response.value,
      args: ["--no-sandbox"],
      executablePath: stats.executablePath,
    })
    .catch(function (error) {
      console.log(error);
    });

  let pages = await browser.pages();
  page = pages[0];
  await page.goto(response.channel_url);
  await delay(3000);
  await page.waitForSelector(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  );
  const buttonClick = await page.$(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  );

  await buttonClick.click();

  await page.keyboard.type(response.username);
  await page.keyboard.press("Tab");
  await page.keyboard.type(response.userpassword);
  await page.keyboard.press("Enter");
  if (response.otp) {
    await delay(60000);
  } else {
    await delay(3000);
  }
  myTimer();
  can_rung_flag = true;
}

let running_flag = true;
let can_rung_flag = false;
function myTimer() {
  myInterval = setInterval(() => enter_sned_message(), 2000);
}

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
  if (
    key.ctrl &&
    key.name == "x" &&
    running_flag == true &&
    can_rung_flag == true
  ) {
    running_flag = false;
    console.log("暫停，ctrl+z可以繼續");
    myStopFunction(myInterval);
  }
  if (
    key.ctrl &&
    key.name == "z" &&
    running_flag == false &&
    can_rung_flag == true
  ) {
    running_flag = true;
    console.log("重新自動輸入，ctrl+x可以暫停");
  }
  if (key.ctrl && key.name == "c") process.exit();
});

function enter_sned_message() {
  page.keyboard.type(makeid(Math.floor(Math.random() * 10 + 9)));
  page.keyboard.press("Enter");
  console.log("自動輸入中，ctrl+x可以暫停，ctrl+c可以關閉程式");
}

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
