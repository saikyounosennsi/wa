const net = require("net");

function Counter(res, code) {
  this[code] = res;
}
Counter.prototype.task = async function (code) {
  console.log("e");
  const apiclient = net.createConnection("../unix.sock");
  apiclient.on("connect", () => {
    console.log("connected.");
  });
  apiclient.on("data", (rawdata) => {
    console.log(rawdata.toString());
    let data = JSON.parse(rawdata.toString());
    console.log(data);
    Counter(data.result, data.code);
    console.log("f");
  });
  apiclient.on("end", () => {
    console.log("disconnected.");
  });
  apiclient.on("error", (err) => {
    console.log(err.message);
  });
  apiclient.write(JSON.stringify({ code: Number(code) }));
};
Counter.prototype.result = function (code) {
  console.log("g");

  console.log(this[code]);
  return this[code];
};

module.exports = Counter;
