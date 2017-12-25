var light=require("./light");
var query=require("./query");
var body=require("./post");
var aa=require("./abc");

var app=light();

app.use(query());
app.use(body())
app.use(aa())

var name="zhangsan";

app.listen(9999,function(){
    console.log(app.port,"start11");
});
app.get("/login",function (req,res) {

    res.send("登录页");
})
app.get("/",function(req,res,next){
    if(name=="zhangsan"){
        next();
    }else{
        res.redirect("/login");
        res.end();
    }
})
app.get("/abc",function(req,res,next){
    res.end("abc");
})
app.get("/ccc",function(req,res,next){
    res.end("ccc");
})




