# javascript 学习

## try catch

> 在try里面发生错误，不会执行try里面错误后的代码，也不会报错，但不会影响try catch 外的代码

```javascript
try {
    console.log("a");
    console.log(b);
    console.log("c")
} catch (e) {
}
console.log("d")
//这里返回结果为 a d
```

## `Error.name`(错误名) 六种值对应的信息

1. `EvalError` : eval()的使用与定义的不一致
2. `RangeError` : 数值越界
3. `ReferenceError` : 非法或不能识别的引用数值
4. `syntaxError` : 发生语法解析错误
5. `TypeError` : 操作数类型错误
6. `URIError` : URI处理函数使用不当

## es5严格模式

> `use strict`

* 不再兼容es3的一些规则语法，使用全新的es5规则
* 两种用法

1. 全局严格模式

```javascript
"use strict"
function test(){
    console.log("hello")
}
```

2. 局部函数类严格模式

```javascript
function test(){
    "use strict"
    console.log("hello")
}
```

* 就是一行字符串，不会对不兼容的浏览器产生影响
* 不支持with、arguments.callee、fun.caller
* 变量赋值前必须声明变量
* 局部this必须赋值(Person.call(null/undefined))赋值什么就是什么

```javascript
"use strict"
function Test(){
 console.log(this)//这里返回undefined
}
Test.call(undefined)

"use strict"
function Test(){
 console.log(this)//这里返回123
}
Test.call(123)
```
