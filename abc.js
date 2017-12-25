module.exports=function(){
    return function(req,res,reslove){
        req.aa=function(){
            console.log("aa")
        }

        res.bb=function(){
            console.log("bb");
        }
        reslove();
    }
}