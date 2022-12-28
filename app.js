// 執行discord.bot
const puppeteer = require("puppeteer");
const prompts = require("prompts");
const PCR = require("puppeteer-chromium-resolver");
const fs = require("fs");

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

let rawdata = fs.readFileSync("./data/pokemon_dataset.json");
let desc = JSON.parse(rawdata);

let api_rawdata = fs.readFileSync("./data/setting.json");
let api_data = JSON.parse(api_rawdata);

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
client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: `discord.js v14`, type: ActivityType.Playing }],
    status: "dnd",
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

// Bot login
client.login(api_data.Api);

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
        xmas2022 = false;
        if (message.embeds[0].image.url.includes("shiny")) shiny_flag = true;
        if (message.embeds[0].image.url.includes("xmas2022")) xmas2022 = true;

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

      if (xmas2022) {
        client.users.send(
          api_data.user_id,
          "快來跟 " + chinese_name + " " + pokemon_name + "戰鬥啊"
        );
      }
      // 只抓需要的
      else if (want_catch_data.includes(pokemon_number) || shiny_flag) {
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
        xmas2022 = false;
        if (message.embeds[0].image.url.includes("shiny")) shiny_flag = true;
        if (message.embeds[0].image.url.includes("xmas2022")) xmas2022 = true;

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
      if (xmas2022) {
        client.users.send(
          api_data.user_id,
          "快來跟 " + chinese_name + " " + pokemon_name + "戰鬥啊"
        );
      }
      // 只抓需要的
      else if (want_catch_data.includes(pokemon_number) || shiny_flag) {
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

  let realnumber = pokemon_number[0];
  if (pokemon_number[1] != "0") {
    realnumber = realnumber.concat("-", pokemon_number[1]);
  }

  pokemon_name = "";
  final_answer = desc.find(function (e) {
    return e.id == realnumber;
  });
  pokemon_name = final_answer["name"];

  return [pokemon_name, realnumber, final_answer["chinese_name"]];
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
