// 註冊指令資料
const fs = require("fs");
const { REST, Routes } = require("discord.js");
const commands = [
  {
    name: "ping",
    description: "ping 是 ping喔",
  },
];

const commands2 = [
  {
    name: "send",
    description: "管理員測試",
    options: [
      {
        name: "user",
        description: "type a user",
        type: 6,
      },
    ],
  },
];

let api_rawdata = fs.readFileSync("./data/setting.json");
let api_data = JSON.parse(api_rawdata);

const rest = new REST({ version: "10" }).setToken(api_data.Api);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(api_data.applicationCommands), {
      body: commands,
    });
    await rest.put(Routes.applicationCommands(api_data.applicationCommands), {
      body: commands2,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
