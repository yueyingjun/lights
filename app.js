var light=require("./light");
var child=require("child_process");
var app=light();
app.listen(9999,function(){
    console.log(app.port,"start11");
});

app.get("/",function(req,res){
   res.sendFile("abc/1.html")
})

app.get("/list/:id",function(req,res){
    res.send(req.params.id);
})
app.get("/form",function(req,res){
    var datas="";
     console.log(req.url);
    res.end("ok");
})


