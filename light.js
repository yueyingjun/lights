var http=require("http");
var config=require("./config.js");
class light{

  listen(port,fn){

      if(arguments.length==0){
          var port=config.port;
          var fn=function(){
              console.log(port)
          }
      }else if(arguments.length==1){
          if(typeof port=="number"){
              var port=port;
              var fn=function(){
                  console.log(port)
              }

          }else if(typeof port=="function"){
              var fn=port;
              var port=config.port;

          }else{
              var port=config.port;
              var fn=function(){
                  console.log(port)
              }

          }
      }else if(arguments.length==2){
            var port=port;
            var fn=fn;
      }

      this.port=port;


      http.createServer(function(req,res){
          res.end("ok");

      }).listen(port,function(){
          if(fn){
              fn();
          }
      })
  }
}

module.exports=function(){
   return new light();
}