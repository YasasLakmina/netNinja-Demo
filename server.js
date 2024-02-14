const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Request made..", req.url, req.method);

  //set header content type
  res.setHeader("Content-Type", "text/html");

  //send an html file
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, () => {
  console.log("Listning for requests on port 3000...");
});
