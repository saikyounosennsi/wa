const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const net = require("net");
const counter = require("./test2.js");
const c = new counter();
const index = fs.readFileSync("./index.ejs", "utf8");
const sample = fs.readFileSync("./sample.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");
/*const socketPath = './tmp.sock'

if (fs.existsSync(socketPath)) {
	fs.unlinkSync(socketPath);
}
*/
let server = http.createServer(getFromClient);
server.listen(/*socketPath*/ 3000, () => {
  console.log("Example app listening on socket" /*socketPath*/);
});

async function getFromClient(req, res) {
  let url_parts = url.parse(req.url, true);

  switch (url_parts.pathname) {
    case "/":
      console.log("logg!!");

      let query = url_parts.query;
      console.log(url_parts.query);
      console.log("a");
      if (query.code != undefined) {
        await c.task(query.code);
        console.log(c.result(query.code));
        var message = c.result(query.code);
        console.log("b");
      }
      /*console.log('c')
      let message = c.result();
			console.log('d')*/
      let content = ejs.render(index, {
        title: "title",
        message: message,
      });

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
      break;

    case "/style.css":
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(style_css);
      res.end();
      break;
    default:
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("no page...");
      break;
  }
}
