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
      type: "confirm",
      name: "otp",
      message: "你有OTP嗎",
      initial: true,
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
      initial: accuont_data["channel_url"],
    },
  ];

  console.log("------------------------正式登入---------------------");
  console.log(pathToExtension);
  const response = await prompts(questions);
  const stats = await PCR(option);
  //update global env
  // process.env.PUPPETEER_EXECUTABLE_PATH = stats.executablePath;
  // const browser = await puppeteer
  //   .launch({
  //     headless: !response.value,
  //     args: [
  //       "--no-sandbox",
  //       "--netifs-to-ignore=INTERFACE_TO_IGNORE",
  //       `--disable-extensions-except=${pathToExtension}`,
  //       `--load-extension=${pathToExtension}`,
  //     ],
  //     executablePath: stats.executablePath,
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  const browser = await stats.puppeteer
    .launch({
      headless: !response.value,
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

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  await page.goto(response.channel_url);
  await delay(3000);

  try {
    if (response.value)
      await page.waitForSelector(
        "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
      );
    const buttonClick = await page.$(
      "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
    );

    await buttonClick.click();
  } catch (error) {
    console.error(error);
    delay(2000);
  }
  try {
    if (response.value)
      await page.focus(
        "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > div > form > div.centeringWrapper-dGnJPQ > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > div.marginBottom20-315RVT > div > div.inputWrapper-1YNMmM.inputWrapper-3ESIDR > input"
      );

    if (page.url() != response.channel_url) {
      await page.keyboard.type(response.username);
      await page.keyboard.press("Tab");

      await page.keyboard.type(response.userpassword);
      await page.keyboard.press("Enter");
    }
    await delay(3000);
  } catch (error) {
    console.error(error);
    delay(2000);
  }

  if (page.url() != response.channel_url) {
    let otp_flag = true;
    if (!response.otp) {
      otp_flag = false;
    }
    while (otp_flag) {
      try {
        if (page.url() === response.channel_url) {
          otp_flag = false;
          break;
        }
        let otp_answer = await prompts(otp_questions);

        if (response.value) await page.waitForSelector(".inputDefault-3FGxgL");
        await page.focus(".inputDefault-3FGxgL");
        await page.keyboard.type(otp_answer.otpvalue);
        await page.keyboard.press("Enter");
        await delay(3000);

        if (page.url() === response.channel_url) {
          otp_flag = false;
          break;
        }
        await delay(3000);
        if (page.url() != response.channel_url) {
          await page.focus(".inputDefault-3FGxgL");
          for (let i = 0; i < otp_answer.otpvalue.length; i++) {
            await page.keyboard.press("Backspace");
          }
        }
        await delay(1000);
        // await page.$eval(".inputDefault-3FGxgL", (el) => (el.value = ""));

        // real_otp_id = "uid_" + (parseInt(otp_id.split("_")[1]) + 1).toString();

        // try {
        //   console.log("#" + real_otp_id + "> span");
        //   // if ((await page.$("//*[@id='" + real_otp_id + "']/span")) !== null) {
        //   if ((await page.$("#" + real_otp_id + "> span")) !== null) {
        //     // Does exist
        //     otp_flag = true;
        //   } else if (
        //     (await page.$(
        //       "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div.content-1SgpWY > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div.markup-eYLPri.editor-H2NA06.slateTextArea-27tjG0.fontSize16Padding-XoMpjI > div > span > span > span"
        //     )) != null
        //   ) {
        //     otp_flag = false;
        //   }
        // } catch (error) {
        //   // Does not
        //   console.error(error);
        //   otp_flag = true;
        // }
      } catch (error) {
        console.error(error);
        delay(2000);
      }
    }
  }
  await delay(2000);

  myTimer();
}

let running_flag = true;
function myTimer() {
  myInterval = setInterval(() => enter_sned_message(), 2000);
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

function enter_sned_message() {
  // const selector =
  //   "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div.markup-eYLPri.editor-H2NA06.slateTextArea-27tjG0.fontSize16Padding-XoMpjI > div > span > span > span";
  page.keyboard.type(makeid(Math.floor(Math.random() * 10 + 9)));
  page.keyboard.press("Enter");

  // await page.$eval(
  //   "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div.markup-eYLPri.editor-H2NA06.slateTextArea-27tjG0.fontSize16Padding-XoMpjI > div > span > span > span",
  //   (e, random_value) => {
  //     e.innerText = random_value;
  //   },
  //   random_value
  // );

  // page.keyboard.press("Enter");

  // console.log(myInterval);
  console.log("自動輸入中，ctrl+x可以暫停，ctrl+c可以關閉程式(目前無法暫停)");
}

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
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
