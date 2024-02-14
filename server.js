const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  //Lodash
  const num = _.random(0, 20);
  console.log(num);

  const great = _.once(() => {
    console.log("Hello");
  });

  great();

  //Small Routing System
  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      //redirect the about-me to about page
      res.setHeader("Location", "/about");
      res.end();
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //   //set header content type
  //   res.setHeader("Content-Type", "text/html");

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Listning for requests on port 3000...");
});
