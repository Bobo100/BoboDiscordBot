const fs = require("fs");
let api_rawdata = fs.readFileSync("./data/setting.json");
let api_data = JSON.parse(api_rawdata);
console.log(api_data.Api);

let url = "https://dyleee.github.io/mewbot-images/sprites/959-0-.png".split("/");
// console.log(url[url.length-1]);
let pokemon_number =
  url[Object.keys(url)[Object.keys(url).length - 1]].split("-");
// console.log(pokemon_number)


let rawdata = fs.readFileSync("./data/want_catch.json");
let data = JSON.parse(rawdata);
// console.log(data)

let i = "1"

console.log(data.includes(i))
