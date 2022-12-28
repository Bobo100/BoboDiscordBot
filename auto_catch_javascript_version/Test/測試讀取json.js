fs = require("fs");
let accuont_data;
account_data_path = "./data/account_data.json";
if (fs.existsSync(account_data_path)) {
  console.log("file exists");
  accuont_data = require(account_data_path);
} else {
  console.log("file not found!");
  data = {
    username: "your dc account",
    userpassword: "your dc password",
    channel_url: "https://your_channel.com",
  };
  accuont_data = JSON.stringify(data); //convert it back to json
  fs.writeFile(account_data_path, accuont_data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

console.log(accuont_data['username']);
