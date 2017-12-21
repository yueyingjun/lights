var light=require("./light");
var app=light();
/*对客户端信息的接收能力  响应能力*/
app.listen(9999,function(){
    console.log(app.port,"start")
});



app.get("/",function(req,res){
res.end("/")
})
app.get("/abc",function(req,res){
res.end("abc");
})
app.get("/aaa",function(req,res){
res.end("aaa");
})

