var http=require("http");
var config=require("./config.js");
var path=require("path")
var fs=require("fs");
class light{
  constructor(){
      this.getInfo=[];
      this.postInfo=[];
      this.rootUrl=process.cwd();
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
                this.run(req.method,req,res)

      }).listen(port,function(){
          if(fn){
              fn();
          }
      })
  }

  run(type,req,res){
    var url=req.url;
    this.extend(req,res);
   if(url=="/favicon.ico"){
       res.end();
   }else {
       if(type=="GET"){

             var flag=true;
             for(var i=0;i<this.getInfo.length;i++){
                 var reg=eval(this.getInfo[i].url);
                 if(reg.test(url)){
                     flag=false
                     req.params={};
                     var result=reg.exec(url);
                     for(var j=0;j<result.length;j++){
                         req.params[this.getInfo[i].attr[j]]=result[j+1];

                     }
                     this.getInfo[i].callback(req,res);
                     break;
                 }

             }
             if(flag){
                 res.end("err");
             }



       }else{


       }

   }
  }

  get(url,fn){
        //路由的匹配
      var arr=url.match(/:([^\/]+)/g)||[];
      arr=arr.map(function (item) {
          return item.substr(1);
      });

      var str=url.replace(/:[^\/]+/g,"([^\/]+)");
      str=str.replace(/\//g,'\\/');
      str="/^"+(str)+'[\\/]?$/';

       var obj={};
       obj["url"]=str;
       obj.callback=fn;
       obj.attr=arr;
       this.getInfo.push(obj);
  }

  extend(req,res){
      res.send=function(message){
          res.end(message);
      };
      res.sendFile=(url)=>{
          var fullpath=path.join(this.rootUrl,url);
          fs.stat(fullpath,function(err){
              if(err){
                  res.end(err.toString())
              }else{
                  fs.createReadStream(fullpath).pipe(res);
              }
          })

      }
  }

}

module.exports=function(){
   return new light();
}