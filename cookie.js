var crypto=require("crypto");
module.exports=function (pass) {
    return function (req,res,reslove) {
        res.cookies=[];
        res.cookie=function(key,val){
            var Cipher=crypto.createCipher("aes-256-cbc",pass);
            Cipher.update(val,"utf8","base64");
            var str=Cipher.final("base64");;
            res.cookies.push(key+"="+str);
            res.setHeader("set-cookie",res.cookies);
        };

        var cookies=req.headers.cookie;
        req.cookies = {};
        if(cookies) {
            var arr = cookies.split("; ");
            console.log(arr);

            for (var i = 0; i < arr.length; i++) {
                var arr1 = arr[i].split("=");
                var Decipher = crypto.createDecipher("aes-256-cbc", pass);
                Decipher.update(arr1[1], "base64", "utf8");
                var str = Decipher.final("utf8");
                req.cookies[arr1[0]] = str;
            }
        }
        reslove();
    }
}