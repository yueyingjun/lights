var light=require("./light");
var query=require("./query");
var body=require("./post");
var aa=require("./abc");
var cookie=require("./cookie");
var app=light();
app.use(query());
app.use(body())
app.use(aa())
app.use(cookie("yueyingjun"))

var name="zhangsan";

app.listen(9999,function(){
    console.log(app.port,"start11");
});
app.get("/login",function(req,res){

    res.sendFile("abc/login.html");
})
app.get("/",function(req,res){

    /*  模板引擎    创造另外一个语言
    *
    *
    *   php
    *
    *
    * */
    var data=[{
        title:"111"
    },{
        title:"2222"
    },{
        title:"333"
    },{
        title:"4444"
    }]

    res.sendFile("abc/1.html");
})
app.get("/message",function(req,res){
    if(req.cookies.login=="yes"){

        res.send("message");
    }else{
        res.redirect("/login");
    }
})
app.get("/save",function(req,res){
    var user=req.query.user;
    var pass=req.query.pass;
    if(user=="zhangsan"&&pass=="123456"){
        res.cookie("login","yes");
        res.redirect("/message");
    }else{
        res.redirect("/login");
    }

})




