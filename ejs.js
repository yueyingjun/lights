function compile(str) {
    var obj = {name: "zhansgan", age: 12, sex: "man"};
    str = str.replace(/'/, '"').replace(/\n/g, "");

    str = str.replace(/<%=(((?!%>).)*)%>/g, function (a, b) {
        return "'+" + b + "+'";
    })

    str = str.replace(/<%(((?!%>).)*)%>/g, function (a, b) {
        return "';\n" + b + "\n tpl+=' "
    })


    str = ("'" + str + "'");

    return new Function("obj", "var tpl='';with(obj){ tpl=" + str + "}\n return tpl");
}

function render(str,data){
   return compile(str)(data)
}

module.exports=render;



































