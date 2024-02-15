const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const dbURI =
  "mongodb+srv://YasasLakmina:Lakmina0115722795@cluster0.lbr7xtj.mongodb.net/Blog-Ninja?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

//Adding to the database
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog 3",
    snippet: "About My New Blog",
    body: "More About My New Blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//Retreving from database
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Retrieving Specific data from the database\
app.get("/single-blog", (req, res) => {
  Blog.findById("65cdaff4c005c71f68ea782e")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(express.static("public"));
app.use(morgan("tiny"));

//Middleware Explanation

// //1st middleware
// app.use((req, res, next) => {
//   console.log("new request made :");
//   console.log("host :", req.hostname);
//   console.log("path :", req.path);
//   console.log("method :", req.method);

//   //does not responsing then we have to use next functiont to move to the next middleware
//   next();
// });

// //2nd middleware
// app.use((req, res, next) => {
//   console.log("in the next middleware");

//   //does not responsing then we have to use next functiont to move to the next middleware
//   next();
// });

//Register vire engine
app.set("view engine", "ejs");

//Listen for requests

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a Blog" });
});

//404 page
//this is middleware function
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
