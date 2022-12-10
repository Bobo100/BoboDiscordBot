const prompts = require("prompts");

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
    message: "Can you confirm?",
    initial: true,
  },
];

(async () => {
  const response = await prompts(questions);
  console.log(response.username);
})();
