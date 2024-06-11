const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Arpit:F8kUrNYZ62AZNxPV@cluster0.ujxqkil.mongodb.net/", { useNewUrlParser: true });

posts = [];

const blogSchema = {
    title: String,
    usr: String,
    content: String
};

const Blog = mongoose.model("Blog", blogSchema);


app.get("/", function (req, res) {
    Blog.find().then((blogs) => {
        res.render("home", {
            posts: blogs
        });
    })

});

app.get("/compose", function (req, res) {
    res.render("compose.ejs");
});

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        usr: req.body.userName,
        content: req.body.postBody
    };
    const newBlog = new Blog({
        title: req.body.postTitle,
        usr: req.body.userName,
        content: req.body.postBody
    });
    newBlog.save();
    posts.push(post);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
