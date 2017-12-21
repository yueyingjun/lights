var http=require("http");
var config=require("./config.js");
class light{

  constructor(){
      this.routeInfo={};
  }
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

      http.createServer((req,res)=>{
         var methods=(req.method);
         if(methods=="GET"){
                this.run(req,res)
         }

          res.end();

      }).listen(port,function(){
          if(fn){
              fn();
          }
      })
  }

  run(req,res){
    var url=req.url;
   if(url=="/favicon.ico"){
       res.end();
   }else {
       var fn = this.routeInfo[url];
       if (fn) {
           fn(req, res);
       } else {
           res.end("err");
       }
   }
  }

  get(url,fn){
        this.routeInfo[url]=fn;
  }

}

module.exports=function(){
   return new light();
}