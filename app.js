// 執行discord.bot
const puppeteer = require("puppeteer");
const { clickCmp } = require("puppeteer-cmp-clicker");
const prompts = require("prompts");
const PCR = require("puppeteer-chromium-resolver");
const solveCaptcha = require("hcaptcha-solver");
const fs = require("fs");

let browser;
let pages;
let page1; //只要我吃飽
let page2; //公子餅
let response;

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
    message: "請輸入帳號",
  },
  {
    type: "text",
    name: "userpassword",
    message: "請輸入密碼",
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
    message: "要抓寶可夢的網址1",
    initial:
      "https://discord.com/channels/771365222476808193/1047176056752316437",
  },
  {
    type: "confirm",
    name: "channel_url_confirm",
    message: "確定要抓嗎",
    initial: true,
  },
  {
    type: "text",
    name: "channel_url2",
    message: "要抓寶可夢的網址2",
    initial:
      "https://discord.com/channels/323890489856229376/1048520441817468988",
  },
  {
    type: "confirm",
    name: "channel_url_confirm2",
    message: "確定要抓嗎",
    initial: true,
  },
];

let rawdata = fs.readFileSync("./data/pokemon_dataset.json");
let desc = JSON.parse(rawdata);

let api_rawdata = fs.readFileSync("./data/setting.json");
let api_data = JSON.parse(api_rawdata);
// Bot login
client.login(api_data.Api);


let want_catch_rawdata = fs.readFileSync("./data/want_catch.json");
let want_catch_data = JSON.parse(want_catch_rawdata);

const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// first_time_login();
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: `discord.js v14`, type: ActivityType.Playing }],
    status: "dnd",
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    const msg = await interaction.reply({
      content: "正在計算延遲......",
      fetchReply: true,
    });
    const ping = msg.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `機器人延遲：${ping} ms\nＡＰＩ延遲：${client.ws.ping} ms`
    );
  }

  if (interaction.isButton()) {
    const buttonID = interaction.customId;
    console.log("buttonID：" + buttonID);
  }
});

client.on("messageCreate", async (message) => {
  let channel = message.channelId;

  const sendMessage = (message, botChannel) => {
    client.channels.cache.get(botChannel).send(message);
  };

  let mewbotid = "519850436899897346";
  // 只要我長大
  if (
    message.author.id === mewbotid &&
    channel === "1047176056752316437"
    //  &&    response.channel_url_confirm
  ) {
    try {
      data = get_name(message);

      if (data[0] != undefined || data[0] != "") {
        pokemon_name = data[0];
        pokemon_number = data[1];
        chinese_name = data[2];

        shiny_flag = false;
        if (message.embeds[0].image.url.includes("shiny")) shiny_flag = true;
        sendMessage(pokemon_name, channel);
        console.log(
          "pokemon name: " +
            pokemon_number +
            " " +
            chinese_name +
            " " +
            pokemon_name
        );
        console.log("channel: 我長大");
      }

      // 只抓需要的
      if (want_catch_data.includes(pokemon_number) || shiny_flag) {
        // 自動抓
        // auto_catch(pokemon_name, page2);
        client.users.send(
          api_data.user_id,
          "抓到了 " + chinese_name + " " + pokemon_name
        );
      }
    } catch (error) {
      // console.error(error);
    }
  }

  // 公子餅
  if (
    message.author.id === mewbotid &&
    channel === "1048520441817468988"
    // &&  response.channel_url_confirm2
  ) {
    try {
      data = get_name(message);

      if (data[0] != undefined || data[0] != "") {
        pokemon_name = data[0];
        pokemon_number = data[1];
        chinese_name = data[2];

        shiny_flag = false;
        if (message.embeds[0].image.url.includes("shiny")) shiny_flag = true;
        sendMessage(pokemon_name, channel);
        console.log(
          "pokemon name: " +
            pokemon_number +
            " " +
            chinese_name +
            " " +
            pokemon_name
        );
        console.log("channel: 公子餅");
      }
      // 只抓需要的
      if (want_catch_data.includes(pokemon_number) || shiny_flag) {
        // 自動抓
        // auto_catch(pokemon_name, page2);
        client.users.send(
          api_data.user_id,
          "抓到了 " + chinese_name + " " + pokemon_name
        );
      }
    } catch (error) {
      // console.error(error);
    }
  }

  if (message.author.id === api_data.user_id) {
    try {
      pokemon_name = "";
      chinese_name = "";
      final_answer = desc.find(function (e) {
        return e.name == message.content;
      });
      pokemon_name = final_answer["name"];
      chinese_name = final_answer["chinese_name"];
      sendMessage(pokemon_name + " " + chinese_name, channel);
    } catch (error) {}
  }
});


// 取得寶可夢名稱
function get_name(message) {
  let pokemon_origin_number = message.embeds[0].image.url.split("/");
  let pokemon_number =
    pokemon_origin_number[
      Object.keys(pokemon_origin_number)[
        Object.keys(pokemon_origin_number).length - 1
      ]
    ].split("-");

  if (pokemon_number[1] != "0") {
    pokemon_name[0] += "-" + pokemon_number[1];
  }

  pokemon_name = "";
  final_answer = desc.find(function (e) {
    return e.id == pokemon_number[0];
  });
  pokemon_name = final_answer["name"];

  return [pokemon_name, pokemon_name[0], final_answer["chinese_name"]];
}

async function auto_catch(pokemon_name, now_page) {
  // 自動抓
  // 取得button
  console.log("Legend pokemon_name: " + pokemon_name);
  await now_page.evaluate(() => {
    let elements = document.getElementsByClassName("label-31sIdr");
    elements[elements.length - 1].click();
  });

  // 輸入寶可夢名稱
  await now_page.waitForSelector(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input"
  );

  await now_page.type(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input",
    pokemon_name
  );
  await now_page.waitForSelector(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F"
  );
  buttonClick = await now_page.$(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F"
  );
  await buttonClick.click();
  console.log("Legend catch");
}

async function first_time_login() {
  response = await prompts(questions);
  console.log("login now");
  const stats = await PCR(option);
  browser = await stats.puppeteer
    .launch({
      headless: !response.value,
      args: ["--no-sandbox"],
      executablePath: stats.executablePath,
    })
    .catch(function (error) {
      console.log(error);
    });
  pages = await browser.pages();
  page1 = pages[0];
  await page1.goto(response.channel_url);
  await delay(3000);
  await page1.waitForSelector(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  );
  const buttonClick = await page1.$(
    "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F"
  );

  await buttonClick.click();

  await page1.keyboard.type(response.username);
  await page1.keyboard.press("Tab");
  await page1.keyboard.type(response.userpassword);
  await page1.keyboard.press("Enter");

  await delay(3000);
  page2 = await browser.newPage();
  await page2.goto(response.channel_url2);
  await delay(3000);
}
