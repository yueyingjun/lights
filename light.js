var http = require("http")
var config = require("./config.js")
var path = require("path")
var fs = require("fs")
class light {
    constructor() {
        this.getInfo = [];
        this.postInfo = [];
        this.useInfo=[];
        this.rootUrl = process.cwd();
    }

    listen(port, fn) {
        if (arguments.length == 0) {
            var port = config.port;
            var fn = function () {
                console.log(port)
            }
        } else if (arguments.length == 1) {
            if (typeof port == "number") {
                var port = port;
                var fn = function () {
                    console.log(port)
                }

            } else if (typeof port == "function") {
                var fn = port;
                var port = config.port;

            } else {
                var port = config.port;
                var fn = function () {
                    console.log(port)
                }

            }
        } else if (arguments.length == 2) {
            var port = port;
            var fn = fn;
        }

        this.port = port;

        http.createServer((req, res) => {
            var methods = (req.method);
            this.run(req.method, req, res)

        }).listen(port, function () {
            if (fn) {
                fn();
            }
        })
    }

    run(type, req, res) {
        var url = req.url;

        if (url == "/favicon.ico") {
            res.end();
        } else {
            /*post data end

               保证我们访问  中间件的内容的时候，保证中间件都加载成功了
             异步*/
             new Promise((reslove,reject)=>{
                 //插件
                 var num=0;
                 if(this.useInfo.length==0){
                     var num=-1;
                     reslove();
                 }
                 for(var i=0;i<this.useInfo.length;i++){

                     new Promise((reslove1,reject1)=>{
                         this.useInfo[i](req,res,reslove1);
                     }).then(()=>{
                            num++;
                            if(num==i){
                                reslove();
                            }
                     })

                 }
             }).then( ()=> {
                 this.extend(req, res);
                 this.request(req,res,type,url)
             })





        }
    }

    request(req,res,type,url){
        res.sendState="ok";
        if(type=="GET"){
            var arr=this.getInfo;
        }else if(type=="POST"){
            var arr=this.postInfo;
        }
        var flag = true;
        for (var i = 0; i < arr.length; i++) {
            var reg = eval(arr[i].url);
            if (reg.test(url)) {
                this.current=i;
                flag = false
                req.params = {};
                var result = reg.exec(url);
                for (var j = 0; j < result.length; j++) {
                    req.params[arr[i].attr[j]] = result[j + 1];

                }
                arr[i].callback(req, res,()=>{
                    this.next(req,res)
                });
                break;
            }

        }

        if (flag) {
            res.end("err");
        }

    }

    next(req,res){
        var nextIndex=this.current+1;
        var nextInfo=this.getInfo[nextIndex];
        res.writeHead(302,{location:nextInfo.originUrl});
        res.end();

    }
    get(url, fn) {
        this.saveInfo(url,fn,"get")
    }
    post(url, fn) {
        this.saveInfo(url,fn,"post")
    }
    all(url,fn){
        this.saveInfo(url,fn,"get")
        this.saveInfo(url,fn,"post")
    }

    saveInfo(url,fn,type){
        var infoArr=type=="get"?this.getInfo:this.postInfo;
        //路由的匹配
        var arr = url.match(/:([^\/]+)/g) || [];
        arr = arr.map(function (item) {
            return item.substr(1);
        });
        var str = url.replace(/:[^\/]+/g, "([^\/]+)");
        str = str.replace(/\//g, '\\/');
        str = "/^" + (str) + '[\\/]?(?:\\?.*)?$/';
        var obj = {};
        obj["url"] = str;
        obj["originUrl"]=url;
        obj.callback = fn;
        obj.attr = arr;
        infoArr.push(obj);
    }

    extend(req, res) {
        res.redirect=function(url){
            res.writeHead(302,{
                "location":url
            })
            res.end();

        }
        res.send = function (message) {
            res.setHeader("content-type","text/html;charset=utf-8");
            res.end(message);
        };
        res.sendFile = (url) => {
            var fullpath = path.join(this.rootUrl, url);
            fs.stat(fullpath, function (err) {
                if (err) {
                    res.end(err.toString())
                } else {
                    fs.createReadStream(fullpath).pipe(res);
                }
            })
        }
    }
    use(fn){
        this.useInfo.push(fn);
    }
}

module.exports = function () {
    return new light();
}