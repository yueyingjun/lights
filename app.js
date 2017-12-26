var light=require("./light");
var query=require("./query");
var body=require("./post");
var cookie=require("./cookie");
var app=light();
app.use(query());
app.use(body())
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
    *    中间件  客户端 请求    服务器 响应
    *
    *    获取到用户的请求数据
    *       get   query
    *       post  body
     *
    *    获取到动态的路由数据
    *     params
    *
    *    设置cookie  加密 解密
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

    res.send("abc");
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


app.get("/demo",function(req,res){
    res.render("demo.html",{name:"zhangsan"})
})

app.get("/load",function(req,res){
    res.download("./post.js");
})




