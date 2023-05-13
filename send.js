const net = require("net");

// UNIXドメインソケットのコネクションを作成する
// net.createConnectionの引数にファイルを指定するとUNIXドメインソケットで繋がる
const client = net.createConnection("unix.sock");
client.on("connect", () => {
  console.log("connected.");
});
client.on("data", (data) => {
  console.log(data.toString());
});
client.on("end", () => {
  console.log("disconnected.");
});
client.on("error", (err) => {
  console.error(err.message);
});
let num = Math.floor(Math.random() * 99 + 1);
client.write(JSON.stringify({ number: num }));
