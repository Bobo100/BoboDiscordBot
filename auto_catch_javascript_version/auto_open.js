// 打包重要知識
// 要加上--public
// https://blog.csdn.net/qq_31254489/article/details/118864759

const puppeteer = require("puppeteer");
const prompts = require("prompts");
const PCR = require("puppeteer-chromium-resolver");
fs = require("fs");
const path = require("path");

const questions_first_time = [
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
    type: "text",
    name: "channel_url",
    message: "要刷頻道的網址",
  },
];

let otp_questions = [
  {
    type: "text",
    name: "otpvalue",
    message: "請輸入otp",
  },
];

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

// 宣告
let accuont_data;
let = account_data_path = "./data/auto_type_account_data.json";
let = dirpath = "./data";
let page;
let myInterval;

const pathToExtension = path.resolve("./my-extension");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

first_time_login();

async function first_time_login() {
  if (fs.existsSync(account_data_path)) {
    console.log("file exists");
    // accuont_data = require(account_data_path);
    await fs.readFile(account_data_path, "utf8", function (err, data) {
      accuont_data = JSON.parse(data);
    });
  } else {
    console.log("第一次使用，紀錄帳號資料");
    await fs.promises.mkdir(dirpath, { recursive: true });
    const first_time_response = await prompts(questions_first_time);
    data = {
      username: first_time_response.username,
      userpassword: first_time_response.userpassword,
      channel_url: first_time_response.channel_url,
    };
    accuont_data = JSON.stringify(data); //convert it back to json
    fs.writeFile(account_data_path, accuont_data, function (err) {
      if (err) {
        console.log(err);
      }
    });
    accuont_data = data;
  }

  await delay(2000);
  const questions = [
    {
      type: "text",
      name: "username",
      message: "請輸入DC帳號",
      initial: accuont_data["username"],
    },
    {
      type: "text",
      name: "userpassword",
      message: "請輸入DC密碼",
      initial: accuont_data["userpassword"],
    },
    {
      type: "text",
      name: "channel_url",
      message: "要刷頻道的網址",
      initial: accuont_data["channel_url"],
    }
  ];

  const count_value = [
    {
      type: "text",
      name: "count_value",
      message: "要刷幾次指令",
      initial: 5,
    },
  ];

  console.log("------------------------正式登入---------------------");
  console.log(pathToExtension);
  const response = await prompts(questions);
  const stats = await PCR(option);

  const browser = await stats.puppeteer
    .launch({
      headless: false,
      userDataDir: "./userData",
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

  let pages = await browser.pages();
  page = pages[0];

  // await page.setUserAgent(
  //   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  // );

  await page.goto(response.channel_url);
  await delay(3000);

  // try {
  //   await page.waitForSelector(
  //     "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  //   );
  //   const buttonClick = await page.$(
  //     "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  //   );

  //   await buttonClick.click();
  // } catch (error) {
  //   console.error(error);
  //   delay(2000);
  // }

  // try {
  //   if (page.url() != response.channel_url) {
  //     await page.keyboard.type(response.username);
  //     await page.keyboard.press("Tab");

  //     await page.keyboard.type(response.userpassword);
  //     await page.keyboard.press("Enter");
  //   }
  //   await delay(3000);
  // } catch (error) {
  //   console.error(error);
  //   delay(2000);
  // }

  // await delay(15000);

  while (true) {
    let i = 0;
    const count_value_response = await prompts(count_value);
    while (i < count_value_response.count_value) {
      await page.keyboard.type("/christmas open_largegift ");
      await page.keyboard.press("Enter");
      await delay(5000);
      i++;
    }
  }
}
