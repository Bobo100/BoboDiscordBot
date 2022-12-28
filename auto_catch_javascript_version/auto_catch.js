const puppeteer = require("puppeteer");
const prompts = require("prompts");
const PCR = require("puppeteer-chromium-resolver");
fs = require("fs");
const path = require("path");
const { off } = require("process");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

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
    message: "要自動抓取的網址",
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
let = account_data_path = "./data/auto_catch_account_data.json";
let = dirpath = "./data";
let page;
let userdata = "./userData";

const pathToExtension = path.resolve("./my-extension");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

first_time_login();

async function auto_catch() {
  pokemon_url = driver
    .find_elements(By.CLASS_NAME, "originalLink-Azwuo9")
    [-1].get_attribute("href");

  await page.waitForSelector("originalLink-Azwuo9");
  const buttonClick = await page.$("originalLink-Azwuo9");
}

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
      message: "要自動抓取的網址",
      initial: accuont_data["channel_url"],
    },
  ];

  console.log("------------------------正式登入---------------------");
  console.log(pathToExtension);
  const response = await prompts(questions);
  const stats = await PCR(option);
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
  await page.goto(response.channel_url);
  await delay(3000);

  try {
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
    await delay(3000);
  } catch {}

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

        await page.waitForSelector(".inputDefault-3FGxgL");
        await page.focus(".inputDefault-3FGxgL");
        await page.keyboard.type(otp_answer.otpvalue);
        await page.keyboard.press("Enter");
        await delay(3000);
        if (page.url() === response.channel_url) {
          otp_flag = false;
          break;
        } else {
          await page.focus(".inputDefault-3FGxgL");
          for (let i = 0; i < otp_answer.otpvalue.length; i++) {
            await page.keyboard.press("Backspace");
          }
        }
      } catch (error) {
        console.error(error);
        delay(2000);
      }
    }
  }

  await delay(2000);
  // 想抓的寶可夢資料庫
  let want_catch_path = "../data/want_catch.json";
  const want_catch_data_origin = await readFile(want_catch_path, "utf8");
  let want_catch_data = JSON.parse(want_catch_data_origin);

  // 寶可夢資料庫
  let pokemon_dataset_path = "../data/pokemon_dataset.json";
  const pokemon_dataset_origin = await readFile(pokemon_dataset_path, "utf8");
  let pokemon_dataset = JSON.parse(pokemon_dataset_origin);

  let article_id;
  while (true) {
    try {
      const article = await page.$x(
        "//a[contains(@class, 'originalLink-Azwuo9')]/../../../../../../.."
      );

      for (let i = 1; i <= 2; i++) {
        article_id = await page.evaluate(
          (el) => el.id,
          article[article.length - i]
        );
        const pokemon_url = await page.$eval(
          "#" +
            article_id +
            " > article > div > div > div.imageContent-3Av-9c.embedWrapper-1MtIDg.embedMedia-1mdWSP.embedImage-2Ynqkh > div > div > a",
          (elements) => elements.href
        );

        let article_selector = "#" + article_id + " > div > div > div > button";
        await delay(1000);
        await page.$eval("#" + article_id, (e) => {
          e.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
          });
        });

        let pokemon_number = pokemon_url.split("/").pop().split("-")[0];
        let pokemon_number_region = pokemon_url.split("/").pop().split("-")[1];
        // console.log(pokemon_number + "-" + pokemon_number_region);
        // 開抓
        if (
          pokemon_url.includes("shiny") ||
          want_catch_data.includes(pokemon_number)
        ) {
          if (pokemon_number_region != "0") {
            pokemon_number = pokemon_number + "-" + pokemon_number_region;
          }

          let pokemon_data = pokemon_dataset.filter(
            (x) => x.id === pokemon_number
          );
          let pokemon_name = pokemon_data[0].name;
          let chinese_name = pokemon_data[0].chinese_name;

          console.log("重要寶可夢：" + chinese_name);
          // 按鈕

          if (await page.$(article_selector)) {
            await page.click(article_selector);
            // 輸入框
            article_selector =
              "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input";
            await page.waitForSelector(article_selector);
            await page.focus(article_selector);

            console.log(pokemon_name);
            await page.keyboard.type(pokemon_name);
            article_selector =
              "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F";
            await page.click(article_selector);
          }

          // await page.click(article_selector);

          // // 輸入框
          // article_selector =
          //   "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input";
          // await page.waitForSelector(article_selector);
          // await page.focus(article_selector);

          // console.log(pokemon_name);
          // await page.keyboard.type(pokemon_name);
          // article_selector =
          //   "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F";
          // await page.click(article_selector);
        }

        //全抓取模式
        // if (pokemon_number_region != "0") {
        //   pokemon_number = pokemon_number + "-" + pokemon_number_region;
        // }

        // let pokemon_data = pokemon_dataset.filter(
        //   (x) => x.id === pokemon_number
        // );
        // let pokemon_name = pokemon_data[0].name;
        // let chinese_name = pokemon_data[0].chinese_name;

        // console.log("重要寶可夢：" + chinese_name);
        // // 按鈕

        // if (await page.$(article_selector)) {
        //   await page.click(article_selector);
        //   // 輸入框
        //   article_selector =
        //     "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input";
        //   await page.waitForSelector(article_selector);
        //   await page.focus(article_selector);

        //   console.log(pokemon_name);
        //   await page.keyboard.type(pokemon_name);
        //   article_selector =
        //     "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F";
        //   await page.click(article_selector);
        // }
        await delay(1000);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
