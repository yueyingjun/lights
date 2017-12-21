var light=require("./light");
var app=light();
app.listen(9999,function(){
    console.log(app.port,"start")
});
