# javascript 学习

## 比较运算符

### >(大于)

```javascript
var a = 1 > 2;
console.log(a)
//结果：false
var c = "a" > "b";
consoloe.log(c)
//结果：false 字符串比较的是ASCII码
```

### <(小于)

```javascript
var a = 1 < 2;
console.log(a)
//结果：true
var c = "b" > "a";
consoloe.log(c)
//结果：false 字符串比较的是ASCII码
```

### ==

```javascript
var a = 1 == 2;
console.log(a)
//结果：false

```

### >=(大于等于)

```javascript
var a = 1 >= 2;
console.log(a)
//结果：false

```

### <=(小于等于)

```javascript
var a = 1 <= 2;
console.log(a)
//结果：true

```

### !=(不等于)

```javascript
var a = 1 != 2;
console.log(a)
//结果：true

```

> **注意**
>
>1. NAN == NAN 结果为false
>
> 2. 字符串比较时比较ASCII，字符串比较时先拿开头的字进行比较，让后看其后进行比较
> 3. 比较运算符比较的结果为boolean值
>

## 逻辑运算符

### &&（与）

>先看第一个表达式，如果第一个表达式转换为布尔值结果为真，那么它会看第二个表达式转换为布尔值的结果，然后如果只有两个表达式，返回第二个表达式的值，（如果第一个表达式为假，不会往后执行，返回第一个表达式值）

```javascript
var a = 1 && 0 && 1;
console.log(a)
//结果为 0
```

### || (或)

> 看第一个表达式，如果第一个表达式转换为boolean值为真，返回第一个表达式的值（如果第一个表达式为假，看后面表达式，如果为真返回值，为假时继续看表达式（有两个表达式时，返回第二个表达式的值，有两个以上的表达式时，继续往后看））

```javascript
var a = 1 > 2 || 2 > 1;
console.log(a)
//结果： true
```

### !(非)

> 将表达式转换为boolean值，然后再将布尔值转换成相反的布尔值

```javascript
var a = !(1 > 2)
console.log(a)
//结果： true
```

### 被认定为false的值

1. undefind
2. null
3. NAN
4. " "
5. 0
6. false

## 条件语句

### if else、if else if

```javascript
if(2 > 3){
    console.log("true")
}else{
    console.log("false")
}
//结果：false
if(2 > 3){
     console.log("第一")
}else if( 3 > 2){
    console.log("第二")
}else{
     console.log("第三")
}
//结果： 第二
```

### for循环

```javascript
for(var i = 0; i < 5; i++){
    console.log(i)
}
//结果：0，1，2，3，4
```

### while、 do while

```javascript
var  i = 0;
while( i < 100){
    if(i …% 7 == 0 || i % 10 == 7){
        console.log(i)
    }
    i++
}
//结果： 0-100被7整除和被7整除个位为7的数
```

```javascript
var  i = 0;
do{
    console.log(a)
}while( i < 10)
//结果：aaaaaaaaaa
```

### switch acse 、break、continue

```javascript
switch(条件语句){
    case 条件1:
        当条件1等于条件语句时执行;
        break;
    case 条件2:
        当条件2等于条件语句时执行;
        break;
}
```

#### break (终止循环)

#### continue 跳过满足条件的语句

```javascript
for(var i = 0; i < 100; i++){
      if(i …% 7 == 0 || i % 10 == 7){
        continue
    }
    console.log(i)
//结果： 0-100不被7整除和不被7整除个位不为7的数
}
```

## 初始引用值

### 数组

> var arr = [1,2,3]
>
>1. arr[index]为数组的第几位，index为索引值从0开始

### 对象

```javascript
var obj = {
    name : "田",
    age : 20,
    sex : "男"
}
```

## 练习

1. 计算2的n次幂，n可输入，n为自然数

```javascript
 var n = parseInt(window.prompt("input"))
    // 1 * 2
    // 1 * 2 * 2
    // 1 * 2 * 2 * 2
    var munl = 1
    for(var i = 0; i < n; i++){
        munl *= 2;
    }
    document.write(munl)
```

2. 计算n的阶乘，n可输入

```javascript
 var n = parseInt(window.prompt("input"))
    // 5! = 5 * 4 * 3 * 2 * 1
    // 4! = 4 * 3 * 2 * 1
    // 3! = 3 * 2 * 1
    var munl = 1
    for(var i = 1; i <= n; i++){
        munl *= i;
    }
    console.log(munl)
```

3. 输入a,b,三个数字，打印出最大的

```javascript
var a = parseInt(window.prompt("input")),
    b = parseInt(window.prompt("input")),
    c = parseInt(window.prompt("input"));
    if (a > b) {
        if (a > c) {
            console.log(a)
        } else {
            console.log(c)
        }
    } else {
        if (b > c) {
            console.log(b)
        } else {
            console.log(c)
        }
    }
```

4. 著名的斐波那契额数列 1 1 2 3 5 8 输出第n列

```javascript
var n = parseInt(window.prompt("input"));
  //     f s t
  //   1 1 2 3 5 8
  //       f s t
  // t = f + s 向后推移
  var f = 1,
      s = 1,
      t;
  if (n > 2) {
      for (var i = 0; i < n - 2; i++) {
          t = f + s;
          f = s;
          s = t
      }
        console.log(t)
  }else{
        console.log(1)
  }
```

5. 打印100以内的质数

```javascript
//除了1和自身，不能被其他数整除
// i: 1
// j: 1
// 1 % 1 [count计数，如果有两次 1 % 1 余数为0就输出]循环一次count返回为0

// i: 2
// j: 1 - 2
//  1 % 1-2 [count计数，如果有两次 2 % 1-2 余数为0就输出]循环一次count返回为0

// i: 3
// j: 1 - 2 -3
//  3 %  1 - 2 -3 [count计数，如果有两次 3 %  1 - 2 -3 余数为0就输出]循环一次count返回为0

// i: 4
// j: 1 - 2 -3 - 4
//  4 %  1 - 2 -3 - 4[count计数，如果有两次 4 %  1 - 2 -3 -4 余数为0就输出]循环一次count返回为0
//方法一
var count = 0;
for(var i = 1;i < 100;i++){
  for(var j = 1; j <= i;j++){
      if(i % j == 0){
          count++;
      }
  }
  if(count == 2){
        console.log(i + "")
  }
  count = 0;
}
//方法二
//Math.sqrt(n) 求n的平方
var count = 0;
for(var i = 2;i < 100;i++){
  for(var j = 1; j <= Math.sqrt(i);j++){
      if(i % j == 0){
          count++;
      }
  }
  if(count == 1){
       console.log(i + "")
  }
  count = 0;
}
```

6. 编写一个程序，输入一个三位数的正整数，输出时反向输出，如输入：456 ，输出 654

```javascript
// 输入n
// 个位：g = n % 10 
// 十位：s = Math.floor((n % 100)/10)
// 百位: b = Math.floor((n / 10)/10)
// 输出
// g * 100 + s * 10 + b
var n = parseInt(window.prompt("input"));

var g = n % 10,
   s = Math.floor((n % 100) / 10),
   b = Math.floor((n / 10) / 10);
var res = g * 100 + s * 10 + b;
  console.log(res)
```
