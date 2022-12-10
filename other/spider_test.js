#!/usr/bin/env node
const fs = require("fs");
const puppeteer = require("puppeteer");
const { clickCmp } = require("puppeteer-cmp-clicker");

region = [
  "关都",
  "城都",
  "丰缘",
  "神奧",
  "合眾",
  "卡洛斯",
  "阿羅拉",
  "伽勒尔",
  "帕底亚",
];
(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: true }); // default is true

  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(
    "https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89#.23001_-_.23151_.E5.A6.99.E8.9B.99.E7.A7.8D.E5.AD.90_-_.E5.A4.A2.E5.B9.BB"
  );

  //資料庫建立
  // 001-151
  var pokemon_dataset = [];
  for (var i = 0; i < region.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
    console.log(region[i]);
    await page.waitForSelector(
      "#mw-content-text > div > table.roundy.eplist.s-" +
        region[i] +
        ".sortable.jquery-tablesorter > tbody > tr:nth-child(1) > td:nth-child(1)"
    );

    try {
      var temp_number = 1;
      // 001-151
      do {
        var pokenumber = await page.$eval(
          "#mw-content-text > div > table.roundy.eplist.s-" +
            region[i] +
            ".sortable.jquery-tablesorter > tbody > tr:nth-child(" +
            temp_number +
            ") > td:nth-child(1)",
          (el) => el.textContent
        );
        pokenumber = pokenumber.replace("\n", "").replace("#", "");
        var pokename = await page.$eval(
          "#mw-content-text > div > table.roundy.eplist.s-" +
            region[i] +
            ".sortable.jquery-tablesorter > tbody > tr:nth-child(" +
            temp_number +
            ") > td:nth-child(5)",
          (el) => el.textContent
        );
        pokename = pokename.replace("\n", "");

        var chinese_pokename = await page.$eval(
          "#mw-content-text > div > table.roundy.eplist.s-" +
            region[i] +
            ".sortable.jquery-tablesorter > tbody > tr:nth-child(" +
            temp_number +
            ") > td:nth-child(3)",
          (el) => el.textContent
        );
        chinese_pokename = chinese_pokename.replace("\n", "");
        var obj = {
          id: pokenumber,
          name: pokename,
          chinese_name: chinese_pokename,
        };

        pokemon_dataset.push(obj);
        temp_number += 1;
      } while (pokenumber != "");
    } catch (error) {
      console.log(error);
    }
  }
  browser.close();
  console.log(pokemon_dataset);

  fs.writeFile(
    "pokemon_dataset.json",
    JSON.stringify(pokemon_dataset),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
})();

// let rawdata = fs.readFileSync("pokemon_dataset.json");
// var desc = JSON.parse(rawdata);

// final_answer = desc.find(function (e) {
//   return e.id == 3;
// });

// // console.log(final_answer['id'])

// const Legend = [
//   "144",
//   "145",
//   "146",
//   "147",
//   "148",
//   "149",
//   "150",
//   "151",
//   "243",
//   "244",
//   "245",
//   "246",
//   "247",
//   "248",
//   "249",
//   "250",
//   "251",
//   "252",
//   "253",
//   "254",
//   "255",
//   "256",
//   "257",
//   "258",
//   "259",
//   "260",
//   "350",
//   "371",
//   "372",
//   "373",
//   "374",
//   "375",
//   "376",
//   "377",
//   "378",
//   "379",
//   "380",
//   "381",
//   "382",
//   "383",
//   "384",
//   "385",
//   "386",
//   "479",
//   "480",
//   "481",
//   "482",
//   "483",
//   "484",
//   "485",
//   "486",
//   "487",
//   "488",
//   "489",
//   "490",
//   "491",
//   "492",
//   "493",
//   "633",
//   "634",
//   "635",
//   "638",
//   "639",
//   "640",
//   "641",
//   "642",
//   "643",
//   "644",
//   "645",
//   "646",
//   "647",
//   "648",
//   "649",
//   "704",
//   "705",
//   "706",
//   "716",
//   "717",
//   "718",
//   "719",
//   "720",
//   "721",
//   "782",
//   "783",
//   "784",
//   "785",
//   "786",
//   "787",
//   "788",
//   "789",
//   "790",
//   "791",
//   "792",
//   "793",
//   "794",
//   "795",
//   "796",
//   "797",
//   "798",
//   "799",
//   "800",
//   "801",
//   "802",
//   "803",
//   "804",
//   "805",
//   "806",
//   "807",
//   "808",
//   "809",
//   "885",
//   "886",
//   "887",
//   "888",
//   "889",
//   "890",
//   "891",
//   "892",
//   "893",
//   "894",
//   "895",
//   "896",
//   "897",
//   "898",
//   "905",
//   "993",
//   "995",
//   "996",
//   "997",
//   "998",
//   "1005",
//   "1006",
//   "1007",
//   "1008",
// ];

// // console.log( Legend.includes("372"))

// // var el = document.querySelectorAll('.messageListItem-ZZ7v6g > div > .container-2sjPya > article > div > div > div.imageContent-3Av-9c.embedWrapper-1MtIDg.embedMedia-1mdWSP.embedImage-2Ynqkh > div > div > a').href

// const readline = require("readline");
// var myInterval;
// var running_flag = true;

// myTimer();
// function myTimer() {
//   myInterval = setInterval(() => enter_sned_message(), 2000);
// }

// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.isTTY) process.stdin.setRawMode(true);
// process.stdin.on("keypress", (str, key) => {
//   console.log(key);
//   if (key.ctrl && key.name == "x" && running_flag == true) {
//     running_flag = false;
//     console.log("暫停中");
//     myStopFunction(myInterval);
//   }
//   if (key.ctrl && key.name == "z" && running_flag == false) {
//     running_flag = true;
//     console.log("繼續");
//     myTimer();
//   }
//   if (key.ctrl && key.name == "c") process.exit();
// });

// function myStopFunction(myInterval) {
//   clearInterval(myInterval);
// }

// function enter_sned_message() {
//   console.log("自動輸入中");
// }
