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
  //   {
  //     type: "text",
  //     name: "username",
  //     message: "請輸入DC帳號",
  //   },
  //   {
  //     type: "text",
  //     name: "userpassword",
  //     message: "請輸入DC密碼",
  //   },
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
    initial: true,
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

const otp_question = [
  {
    type: "text",
    name: "otp_value",
    message: "請輸入OTP",
  },
];

let page;

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

  //   await page.keyboard.type(response.username);
  //   await page.keyboard.press("Tab");
  //   await page.keyboard.type(response.userpassword);
  //   await page.keyboard.press("Enter");

  if (response.otp) {
    await delay(2000);
    const otp_answer = await prompts(otp_question);
    await page.keyboard.type(otp_answer.otp_value);
    await page.keyboard.press("Enter");
  }
  await delay(3000);

  // <label
  //   class="label-2bTGzo eyebrow-I4BG42 defaultColor-2cKwKo defaultMarginlabel-1h4HPn error-3EBD81"
  //   id="uid_16"
  //   for="uid_15"
  // >
  //   輸入 Discord 授權碼/備份安全碼
  //   <span class="errorMessage-1kMqS5">
  //     <span class="errorSeparator-f__rwE">-</span>Invalid two-factor code
  //   </span>
  // </label>;
  // type otp

  // #uid_20
}
