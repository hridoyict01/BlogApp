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
//New route..it will show a form
app.get("/blogs/new",(req,res) =>{
    res.render("new");
});
//create rout e
app.post("/blogs", (req,res) =>{
    //create blog
    blog = req.body.blog;
    Blog.create(blog, (err,newblog) =>{
       if(err){
           res.render("new");
       } 
       else{
//redirect to index
        res.redirect("/blogs");
       }
    });
    
});

//show route /blogs/:id

app.get("/blogs/:id", (req,res) =>{
    var id = req.params.id;
    console.log(id);
    Blog.findById(id, (err, blog) =>{
        if(err) {
            res.redirect("/blogs");
        } else {
            console.log(blog);
            res.render("show",{blog});
        }
    });
});


//connection with node server
app.listen(3000, () => {
    console.log("App is started in port 3000");
});