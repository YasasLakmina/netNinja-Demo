const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const path = require("path");

const dbURI =
  "mongodb+srv://YasasLakmina:Lakmina0115722795@cluster0.lbr7xtj.mongodb.net/Blog-Ninja?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

// Register view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a Blog" });
});

// Retrieving single blog from database
app.get("/blogs/update", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("update", { title: "Update", blog: result });
    })
    .catch((err) => console.log(err));
});

// Retrieving all blogs from database
app.get("/", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Handling the post request
app.post("/blogs", (req, res) => {
  const newBlog = new Blog(req.body);

  newBlog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving blog");
    });
});

// Retrieving single blog from database
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Details", blog: result });
    })
    .catch((err) => console.log(err));
});

//Deleating the data
app.delete("/blogs/:id", (req, res) => {
  const blogId = req.params.id;

  // Delete the blog from the database
  Blog.findByIdAndDelete(blogId)
    .then(() => {
      console.log("Blog deleted successfully");
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error deleting blog:", error);
      res.status(500).send("Error deleting blog"); // Send an error response
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
