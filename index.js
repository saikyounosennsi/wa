const fs = require("fs");
const net = require("net");
consote.log(test)
// サーバーを設定
const server = net.createServer((connection) => {
  console.log("connected.");
  connection.on("close", () => {
    console.log("disconnected.");
  });
  connection.on("data", (data) => {
    console.log(data.toString());
    let parse_data = JSON.parse(data.toString());
    let send_data = JSON.stringify({
      result: parse_data.code * 4,
      code: parse_data.code,
    });
    console.log(`send:${send_data}`);
    connection.write(`${send_data}`);
    connection.end();
    console.log("testtest");
  });
  connection.on("error", (err) => {
    console.error(err.message);
  });
});

// ソケットファイルを削除（存在するとlistenできない）
try {
  fs.unlinkSync("unix.sock");
} catch (error) {}

// UNIXドメインソケットでlistenする
server.listen("unix.sock");
