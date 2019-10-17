# javascript 学习

## arguments

### arguments.callee

> 查看函数自身引用是谁

```javascript
var num = (function (){
    if(n = 1){
        return 1;
    }
    return n * arguments.callee(n - 1);
}(20));
//求20的阶乘

```

### fun.caller

> 查看函数的调用坏境(在es5标准模式不能用)

```javascript
function test(){
    demo()
}
function demo(){
    console.log(demo.caller)//打印函数test 
}
test()
```

## 克隆

1. 判断是不是原始值
2. 判断是数组还是对象
3. 建立相应的数组或对象
4. 递归

### 深度克隆封装（deepColne）

```javascript
/*
   判断是不是原始值 typeof() ==> 返回值如果是object则为引用值，否则为原始值
   判断是数组还是对象 object.prototype.toString.call()
   是否遍历原型的属性origin.hasOwnproperty(prop)
*/
var obj = {
   name: "田",
   age: 18
}
var obj1 = {

}
function deepColne(origin, target) {
   var target = target || {},
       toStr =Object.prototype.toString,
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
```

## 三目运算符

> `条件 ? 为true时执行 ： 为false时执行`

```javascript
var num  = 1 > 0 ? ("10" > "9" ? 1 : 0) : 2
//num 最后为0
/*
()运算符的优先级最高，字符串比较时比较ASCII大小 "10" 小于 "9"
*/
```

## 数组

### 数组的定义

#### 字面量

> `var arr = []`

#### 构造方法定义

> `new Array()`

```javascript
var arr = [10] //这里数组的第一个数为10
var arr = new Arrar(10) //这楼里返回一个长度为10的数组

```

### 数组的读和写

1. 不可溢出读

```javascript
var arr = [1,2]
cosnole.log(arr[10]) ==> 这里返回结果为undefined

```

2. 可以溢出写

```javascript
   var arr = [];
       arr[10] = "abc"
       console.log(arr) ==> 这里返回的结果为`[empty × 10, "abc"]`
```

### 数组常用的方法

#### 改变原数组

##### push

> 给数组添加值

```javascript
 var arr = [1,2,3];
     arr.push(4)
     console.log(arr) ==> 这里返回的结果为[1,2,3,4]
```

##### pop

> 剪切数组的最后一位

```javascript
var arr = [1,2,3];
     var num =  arr.pop();
     console.log(num) //==>这里返回3
     console.log(arr) //==> 这里返回[1,2]
```

##### shift

> 在数组前面删除

```javascript
var arr = [1,2,3];
      arr.shift();
      console.log(arr)//==> 这里返回[2,3]
```

##### unshift

> 在数组前面添加

```javascript
var arr = [1,2,3];
   arr.unshift(4,5)
   console.log(arr)// ==> 这里返回结果为 [4,5,1,2,3]
```

##### reverse

> 逆反数组得顺序

```javascript
var arr = [1,2,3,4];
   arr.reverse();
   console.log(arr)//==> 这里返回的结果为[4,3,2,1]
```

##### splice

> 截取数组
>
> `arr.splce(从第几位截, 截取多少的长度, 在切口处添加数据)`

```javascript
var arr = [1, 4,5,6,7];
var num = arr.splice(2,2);
console.log(num) // ==>这里返回结果为[5,6]
console.log(arr) //==>这里返回结果为[1,4,7]
var num1 = arr.splice(1,0,"t","y");
console.log(arr) //==>这里返回结果为 [1, "t", "y", 4, 7]
```

##### sort

> 数组排序

```javascript
var arr = [1, 4,8,6,7];
arr.sort();
console.log(arr)//==> 这里返回结果为[1, 4, 6, 7, 8]
```

##### 数组排序原理

> `arr.sort(function(a,b){})`
>
1. 当返回值为负数时,前面的数放再前面
2. 为负数时，后面的数放再前面
3. 为0时，不动

```javascript
var arr = [2,5,4,3];
arr.sort(function(a,b){
    if(a > b){
        return -1;
    }else{
        return 1;
    }
})
console.log(arr)// 这里返回结果为 [5,4,3,2]
```

##### 排序方法

```javascript
//升序
arr.sort(function(a,b){
    return a - b;
})
//降序
arr.sort(function(){
    return b -a;
})
```

##### 给一个数组乱序

```javascript
arr.sort(function(a,b){
    return Math.random() - 0.5;
})
```

#### 不改变原数组

##### concat

>拼接数组

```javascript
//一
var a = [1,2,3];
var newarr = a.concat(4,5);
console.log(newarr)//这里返回的结果为[1,2,3,4,5]
//二
var a = [1,2,3];
a1 = ["t","w"]
var newarr = a.concat(a1);//这里返回的结果为[1, 2, 3, "t", "w"]
```

##### join

>拼接数组 `join("-")` 会把数组用 - 拼接起来以字符串的形式返回

```javascript
//一
var a = [1,2,3];
var newarr = a.join("-");//这里返回的结果为字符串 1-2-3

//二
var a = ["t"],
a1 = ["wy",];
var arr = [a,a1];
var newarr = arr.join("");
console.log(newarr)//这里返回结果为字符串 twy

```

##### slice

> `slice(从该位截取，截取到该位)`

```javascript
var arr = [1,2,4,5];
var newarr = arr.slice(1,3);
console.log(newarr)//这里返回的结果位[2,4]
console.log(arr)//这里返回的结果位[1,2,4,5]
```

#### split

> split() 方法用于把一个字符串分割成字符串数组。

```javascript
var str = "hello!,你好啊"
var newstr = str.split(","1)
console.log(newstr)//这里返回的结果是 ["hello!"]
```

## 类数组

> 利用对象的属性名来模拟数组的特性

**注意：属性名要为索引（数字）属性，必须要有length属性，最好加上
push方法**


```javascript
var obj = {
   "0": "a",
   "1": "b",
   "2": "c",
   length: 3,
   push: Array.prototype.push,
   splice:  push: Array.prototype.splice,
}
obj.push("d");
obj.push("e");
console.log(obj)
/*
//返回的结果为
obj = {
   "0": "a",
   "1": "b",
   "2": "c",
   "3":"d",
   "4":"e",
   length: 5,
   push: Array.prototype.push
}
*/
```

### push原理

```javascript
Array.prototype.psuh = function(target){
    obj[obj.length] = target;
    obj.length ++;
}
```

> 类数组可以动态增长length属性

#### 注意

> 如果强行让类数组调用push方法，则根据length属性值的位置进行属性值的扩充

```javascript
var obj = {
   "2": "a",
   "3": "b",
   length: 2,
   push: Array.prototype.push,
   splice:  push: Array.prototype.splice,
}
obj.push("d");
obj.push("e");
console.log(obj)
/*
//返回的结果为
obj = {
   "2": "d",
   "3": "e",
   length: 4,
   push: Array.prototype.push
}
*/
```

## 封装typeof

```javascript
function type(target){
    var ret = typeof(target);
    var template = {
        "[object Array]" : "array",
        "[object Object]" : "object",
        "[object Number]" : "number-object",
        "[object String]" : "string-object",
        "[object Boolean]" : "boolean-object"
    }
    if(target == null){
        return "null"
    }else if(ret == "object"){
        var str = Object.prototype.toString.call(target);
        return template[str]
    }else{
        return ret;
    }
}
```

## 数组去重

### 原理

> 将数组中得每一位值当作对象属性名来判断，如果判断属性名部位undefined时，给对象添加属性为数组值，值为真值的数据，将属性名push给新得数组，当判断到有重复的属性名时为不走!undefined,则新数组不添加值，则达到去重效果

```javascript
Array.prototype.unique = function(){
  var temp = {},
      arr = [],
      len = this.length;
   for(var i = 0; i < len; i++){
       if(!temp[this[i]]){
           temp[this[i]] = "abc";
           arr.push(this[i])
       }
   }
   return arr;
}
```

## 字符串去重

```javascript
String.prototype.unStr = function(){
  var strarr = this.split(""),
      temp = {},
      arr = [],
      len = strarr.length;
  for(var i = 0; i < len; i++){
      if(!temp[strarr[i]]){
          temp[strarr[i]] = true;
          arr.push(strarr[i]);
      }
  }
  return arr.join("");
}
```

