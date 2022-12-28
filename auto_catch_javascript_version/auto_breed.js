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
//  整個流程
// 發送指令
// 檢查最後自己的成功狀態
// 檢查自己最後的失敗狀態

// 如果成功比較後面 => 成功
// 否則繼續點擊最後的孵蛋按鈕  或是 直接重新打指令也可以欸

// 步驟
// 發送孵蛋指令
// facus span
// type /breed
// press tab
// type number (male)
// press tab
// type number (female)
// press enter

// /breed male: 261 females: 380

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
    name: "uid",
    message: "你的discord ID 範例:歐買尬#1234",
  },
  {
    type: "text",
    name: "channel_url",
    message: "要自動生育的網址",
  },
];

const login_check_question = [
  {
    type: "confirm",
    name: "login_check",
    message: "有曾經登入過嗎?(只要使用過自動打字系之類的都算是有)",
    initial: false,
  },
];

const breed_questions = [
  {
    type: "text",
    name: "male",
    message: "請輸入公方代號",
  },
  {
    type: "text",
    name: "females",
    message: "請輸入母方代號",
  },
];

let otp_questions = [
  {
    type: "text",
    name: "otpvalue",
    message: "請輸入otp",
  },
];

let auto_breed_account_data;
let = dirpath = "./data";
let = auto_breed_account_data_path = "./data/auto_breed_account_data.json";
const pathToExtension = path.resolve("./my-extension");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

breed();

async function breed() {
  // 檢查有沒有帳號資料
  if (fs.existsSync(auto_breed_account_data_path)) {
    console.log("file exists");
    await fs.readFile(
      auto_breed_account_data_path,
      "utf8",
      function (err, data) {
        auto_breed_account_data = JSON.parse(data);
      }
    );
  } else {
    console.log("第一次使用，紀錄帳號資料");
    await fs.promises.mkdir(dirpath, { recursive: true });
    const first_time_response = await prompts(questions_first_time);
    data = {
      username: first_time_response.username,
      userpassword: first_time_response.userpassword,
      uid: first_time_response.uid,
      channel_url: first_time_response.channel_url,
    };
    auto_breed_account_data = JSON.stringify(data); //convert it back to json
    fs.writeFile(
      auto_breed_account_data_path,
      auto_breed_account_data,
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    auto_breed_account_data = data;
  }

  await delay(3000);

  // 詢問有沒有登入過
  const login_check_response = await prompts(login_check_question);

  // 要去哪邊孵蛋
  const channel_question = [
    {
      type: "text",
      name: "channel_url",
      message: "要刷孵蛋的網址",
      initial: auto_breed_account_data["channel_url"],
    },
  ];
  const channel_question_response = await prompts(channel_question);

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
  await page.goto(channel_question_response.channel_url);
  await delay(3000);

  // 沒有登入中 所以要登入
  if (!login_check_response.login_check) {
    const questions = [
      {
        type: "text",
        name: "username",
        message: "請輸入DC帳號",
        initial: auto_breed_account_data["username"],
      },
      {
        type: "text",
        name: "userpassword",
        message: "請輸入DC密碼",
        initial: auto_breed_account_data["userpassword"],
      },
      {
        type: "confirm",
        name: "otp",
        message: "你有OTP嗎",
        initial: false,
      },
    ];
    const response = await prompts(questions);
    try {
      console.log("waiting");
      // 在瀏覽器中繼續 按鈕
      await page.waitForSelector(
        "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
      );
      const buttonClick = await page.$(
        "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
      );

      await buttonClick.click();
    } catch {}
    try {
      await page.focus(
        "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > div > form > div.centeringWrapper-dGnJPQ > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > div.marginBottom20-315RVT > div > div.inputWrapper-1YNMmM.inputWrapper-3ESIDR > input"
      );
      await page.keyboard.type(response.username);
      await page.keyboard.press("Tab");

      await page.keyboard.type(response.userpassword);
      await page.keyboard.press("Enter");
      await delay(3000);
    } catch {}

    if (page.url() != channel_question_response.channel_url) {
      let otp_flag = true;
      if (!response.otp) {
        otp_flag = false;
      }
      while (otp_flag) {
        try {
          if (page.url() === channel_question_response.channel_url) {
            otp_flag = false;
            break;
          }
          let otp_answer = await prompts(otp_questions);

          await page.waitForSelector(".inputDefault-3FGxgL");
          await page.focus(".inputDefault-3FGxgL");
          await page.keyboard.type(otp_answer.otpvalue);
          await page.keyboard.press("Enter");
          await delay(3000);

          if (page.url() === channel_question_response.channel_url) {
            otp_flag = false;
            break;
          }
          await delay(3000);
          if (page.url() != channel_question_response.channel_url) {
            await page.focus(".inputDefault-3FGxgL");
            for (let i = 0; i < otp_answer.otpvalue.length; i++) {
              await page.keyboard.press("Backspace");
            }
          }
          await delay(1000);
        } catch (error) {
          console.error(error);
          delay(2000);
        }
      }
    }
  }
  while (true) {
    // 輸入指令
    const breed_questions_response = await prompts(breed_questions);
    command_input_selector =
      "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div > span > span > span";
    await page.waitForSelector(command_input_selector);
    await page.focus(command_input_selector);
    await page.keyboard.type("/breed");
    await delay(2000);
    await page.keyboard.press("Tab");
    await delay(1000);
    await page.keyboard.type(breed_questions_response.male);
    await delay(1000);
    await page.keyboard.press("Tab");
    await delay(1000);
    await page.keyboard.type(breed_questions_response.females);
    await page.keyboard.press("Enter");
    await delay(3000);

    // await page.focus(command_input_selector);

    // await page.keyboard.type("/breed male:");
    // await page.keyboard.type(breed_questions_response.male);
    // await page.keyboard.type(" females:");
    // await page.keyboard.type(breed_questions_response.females);

    // let command =
    //   "/breed male:" +
    //   breed_questions_response.male +
    //   " females:" +
    //   breed_questions_response.females;
    // await page.keyboard.type(command);

    // await page.keyboard.type("/breed ");
    // await page.keyboard.type(breed_questions_response.male);
    // await page.keyboard.press("Tab");
    // await page.keyboard.type(breed_questions_response.females);

    await delay(3000);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Enter");
    await delay(3000);

    // 檢查孵蛋狀態
    // 先找最後自己的訊息
    // 會找出所有的Redo breed (包含其他人的)

    let breed_status = false;
    let last_check = true;
    let last_button_id;

    while (!breed_status) {
      let success_contents = await page.$x(".//article/div/div/div[6]/span");
      let success_time;
      // 找出最後那一個成功的訊息~

      try {
        for (let i = 0; i < success_contents.length; i++) {
          let success_content = await page.evaluate(
            (el) => el.innerText,
            success_contents[i]
          );

          // 找到成功的訊息~ 拿下ID 當作時間使用
          if (success_content.includes(auto_breed_account_data["uid"])) {
            let success = await page.$x(
              ".//article/div/div/div[6]/span/../../../../.."
            );

            let success_id = await page.evaluate((el) => el.id, success[i]);

            console.log("success_id: " + success_id);
            success_value = success_id.split("-").pop();
            success_time = parseInt(success_value);
          }
        }
      } catch {}
      // 找自己最後一個孵化按鈕
      // let button_contents = await page.$x(
      //   "//button[@class='component-ifCTxY button-f2h6uQ lookFilled-yCfaCM colorPrimary-2AuQVo sizeSmall-wU2dO- grow-2sR_-F']/../../../.."
      // );

      let button_contents = await page.$x(
        './/button[contains(concat(" ",normalize-space(@class)," ")," component-ifCTxY ")][contains(concat(" ",normalize-space(@class)," ")," button-f2h6uQ ")][contains(concat(" ",normalize-space(@class)," ")," lookFilled-yCfaCM ")][contains(concat(" ",normalize-space(@class)," ")," colorPrimary-2AuQVo ")][contains(concat(" ",normalize-space(@class)," ")," sizeSmall-wU2dO- ")][contains(concat(" ",normalize-space(@class)," ")," grow-2sR_-F ")]/../../../..'
      );

      console.log(button_contents.length);

      let redobreed_time;
      try {
        for (let i = 0; i < button_contents.length; i++) {
          // message-accessories-1053253142923444255 (id example)
          let button_id = await page.evaluate(
            (el) => el.id,
            button_contents[i]
          );

          let title_selector =
            "#" +
            button_id +
            " > article > div > div > div.embedTitle-2n1pEb.embedMargin-2PsaQ4";
          let username_selector =
            "#" +
            button_id +
            " > article > div > div > div.embedFooter-3dj0UE.embedMargin-2PsaQ4 > span";
          let title = await page.$eval(title_selector, (e) => e.innerText);
          let username = await page.$eval(
            username_selector,
            (e) => e.innerText
          );

          // console.log(title);
          // console.log(username);

          // 代表失敗~ 以及 是自己的訊息
          if (
            title.includes("Breeding Attempt Failed!") &&
            username.includes(auto_breed_account_data["uid"])
          ) {
            // 記錄起來
            // 直到最後一個自己的訊息失敗欄位 才進行動作
            // if (last_check) {
            //   last_button_id = button_id;
            // }
            last_button_id = button_id;
          }
        }
      } catch {}
      console.log("------------------------------");
      // console.log(success_time);
      console.log(last_button_id);

      button_click_selector =
        "#" +
        last_button_id +
        " > div > div > div > button.component-ifCTxY.button-f2h6uQ.lookFilled-yCfaCM.colorPrimary-2AuQVo.sizeSmall-wU2dO-.grow-2sR_-F";

      try {
        await page.$eval(button_click_selector, (e) => {
          e.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
          });
        });
      } catch {}

      let value = last_button_id.split("-").pop();
      redobreed_time = parseInt(value);

      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      // 代表成功孵化~
      if (success_time > redobreed_time) {
        breed_status = true;
        console.log("孵化成功啦~~~，請繼續孵蛋~");
      } else {
        breed_status = false;

        await delay(1000);

        // #message-accessories-1054632352552341514 > article > div > div > div.embedDescription-1DrJxZ.embedMargin-2PsaQ4 > span
        //*[@id="message-accessories-1054632352552341514"]/article/div/div/div[3]
        try {
          let bread_message_flag = true;
          while (bread_message_flag) {
            let bread_messages = await page.$x(
              '//*[@id="' + last_button_id + '"]/article/div/div/div[3]'
            );
            let bread_message = await page.evaluate(
              (el) => el.innerText,
              bread_messages[0]
            );

            if (bread_message.includes("分鐘")) {
              await page.focus(command_input_selector);
              await page.keyboard.type("/breed");
              await delay(2000);
              await page.keyboard.press("Tab");
              await delay(1000);
              await page.keyboard.type(breed_questions_response.male);
              await delay(1000);
              await page.keyboard.press("Tab");
              await delay(1000);
              await page.keyboard.type(breed_questions_response.females);
              await page.keyboard.press("Enter");

              // await page.keyboard.type(command);
              await delay(3000);
              await page.keyboard.press("Enter");
              await page.keyboard.press("Enter");
              await delay(3000);
              break;
            }

            if (bread_message.includes("Now!")) {
              // console.log(bread_message);
              const buttonClick = await page.$(button_click_selector);
              await delay(1000);
              await buttonClick.click();
              console.log("click");
              bread_message_flag = false;
            } else {
              // 沒有出現的話 多等個五秒~
              await delay(7000);
            }
            await delay(2000);
          }
        } catch {}
      }
    }
  }
}
