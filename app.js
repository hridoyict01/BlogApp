var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Database connect
mongoose.connect("mongodb://localhost/restful_blog_app");

//Blog Schema 
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
//Model config
var Blog = mongoose.model("Blog", blogSchema);

//RESTful routing



//Home Route
app.get("/", (req,res) => {
    res.redirect("/blogs");
});
//Index Route
app.get("/blogs", (req,res) =>{
    Blog.find({},(err, blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index",{blogs});
        }
    });
    
});


//connection with node server
app.listen(3000, () => {
    console.log("App is started in port 3000");
});