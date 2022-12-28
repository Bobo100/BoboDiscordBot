const puppeteer = require("puppeteer");
const prompts = require("prompts");
const PCR = require("puppeteer-chromium-resolver");
fs = require("fs");
const path = require("path");
const { off } = require("process");
const { promisify } = require("util");
const { table } = require("console");
const readFile = promisify(fs.readFile);

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

let auto_breed_account_data;
let = dirpath = "./data";
let = auto_breed_account_data_path = "./data/auto_breed_account_data.json";
const pathToExtension = path.resolve("./my-extension");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

catch_user_data();

async function catch_user_data() {
    // 檢查有沒有帳號資料
    //   if (fs.existsSync(auto_breed_account_data_path)) {
    //     console.log("file exists");
    //     await fs.readFile(
    //       auto_breed_account_data_path,
    //       "utf8",
    //       function (err, data) {
    //         auto_breed_account_data = JSON.parse(data);
    //       }
    //     );
    //   } else {
    //     console.log("第一次使用，紀錄帳號資料");
    //     await fs.promises.mkdir(dirpath, { recursive: true });
    //     const first_time_response = await prompts(questions_first_time);
    //     data = {
    //       username: first_time_response.username,
    //       userpassword: first_time_response.userpassword,
    //       uid: first_time_response.uid,
    //       channel_url: first_time_response.channel_url,
    //     };
    //     auto_breed_account_data = JSON.stringify(data); //convert it back to json
    //     fs.writeFile(
    //       auto_breed_account_data_path,
    //       auto_breed_account_data,
    //       function (err) {
    //         if (err) {
    //           console.log(err);
    //         }
    //       }
    //     );
    //     auto_breed_account_data = data;
    //   }

    //   await delay(3000);

    //   // 詢問有沒有登入過
    //   const login_check_response = await prompts(login_check_question);

    //   // 要去哪邊孵蛋
    //   const channel_question = [
    //     {
    //       type: "text",
    //       name: "channel_url",
    //       message: "要刷孵蛋的網址",
    //       initial: auto_breed_account_data["channel_url"],
    //     },
    //   ];
    //   const channel_question_response = await prompts(channel_question);

    const stats = await PCR(option);
    // 開啟網站
    const browser = await stats.puppeteer
        .launch({
            headless: false,
            userDataDir: "./userData",
            args: [
                "--no-sandbox",
                // "--netifs-to-ignore=INTERFACE_TO_IGNORE",
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
    await page.goto(
        "https://discord.com/channels/323890489856229376/591838547061899274"
    );
    await delay(3000);
    

    // #message-accessories-1054782572149874839 > article > div > div > div.embedDescription-1DrJxZ.embedMargin-2PsaQ4
    // #message-accessories-1054782572149874839 > article > div > div > div.embedDescription-1DrJxZ.embedMargin-2PsaQ4 > span:nth-child(1)
    // #message-accessories-1054782572149874839 > article > div > div > div.embedDescription-1DrJxZ.embedMargin-2PsaQ4 > span:nth-child(2)
    // #message-accessories-1054782572149874839 > article > div > div > div.embedDescription-1DrJxZ.embedMargin-2PsaQ4 > strong:nth-child(3)


}
