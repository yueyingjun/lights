var light=require("./light");
var child=require("child_process");
var app=light();
/*对客户端信息的接收能力  响应能力*/
app.listen(9999,function(){
    console.log(app.port,"start11");
});


/*
*
  express

  "/list/1"

  /^\/list\/[^\/]+/
  router.get("/list/:id",function(){
  })
* */

var url="/list/zhangsan";

var mode="/list/:id";



var str=mode.replace(/:[^\/]+/,"([^\/]+)");

str=str.replace(/\//g,"\\/")
str="/^"+str+"/";
console.log(eval(str).exec(url)[1]);



app.get("/abc",function(req,res){
   res.send("abc")
})

app.get("/list/:id",function(req,res){
    res.send(req.params.id);
})


