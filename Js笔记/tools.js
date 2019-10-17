// --T W Y-- 

//数组去重
Array.prototype.unArr = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
}


//字符串去重
String.prototype.unStr = function () {
    var strarr = this.split(""),
        temp = {},
        arr = [],
        len = strarr.length;
    for (var i = 0; i < len; i++) {
        if (!temp[strarr[i]]) {
            temp[strarr[i]] = true;
            arr.push(strarr[i]);
        }
    }
    return arr.join("");
}

//数组升序
Array.prototype.arrUp = function () {
    this.sort(function (a, b) {
        return a - b;
    });
    return this;
}

//数组降序
Array.prototype.arrDown = function () {
    this.sort(function (a, b) {
        return b - a;
    });
    return this;
}


//克隆
function deepColne(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrstr = "[object Array]"
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== "null" && typeof (origin[prop]) == "object") {
                if (toStr.call(origin[prop]) == arrstr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepColne(origin[prop], target[prop])
            } else {
                target[prop] = origin[prop]
            }
        }
    }
    return target;
}

//typeof
function type(target) {
    var temp = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number-object",
        "[object String]": "string-object",
        "[object Boolean]": "boolean-object"
    },
        ret = typeof (target);
    if (target == null) {
        return "null";
    } else if (ret == "object") {
        var str = Object.prototype.toString.call(target);
        return temp[str];
    } else {
        return ret;
    }
}


//圣杯模式 --继承
var inherit = (function () {
    var F = function () { }
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;//查看构造函数
        Target.prototype.uber = Origin;//查看继承谁
    }
}())

//子元素后面添加元素节点(兼容模式)
Element.prototype.insetAfter = function (targetNode, originNode) {
    if (originNode.nextElementSibling) {
        originNode = originNode.nextElementSibling;
    } else {
        for (originNode = originNode.nextSibling; originNode && originNode.nodeType != 1; originNode = originNode.nextSibling);
    }
    if (originNode == null) {
        this.appendChild(targetNode);
    }else{
        this.insertBefore(targetNode,originNode)
    }
}

