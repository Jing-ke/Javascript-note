# javascript 学习

## 编程形式的区别

### 面向过程

> 面向过程是将程序按照功能分成多个子模块，每个子模块完成相应的功能，然后通过子模块来完成程序（如盖房子不用分工，先打地基，打完地基砌砖....一步一步来完成）

### 面向对象

>面向对象是把处理的问题先抽象起来，以对象为中心封装不同的方法（如盖房子有明确的分工，谁来打地基，谁来砌砖，谁来盖房顶...）

## typeof 六种数据类型

1. Number
2. String
3. Object
4. undefind
5. Boolean
6. function

> **注意**
>
>1. typeof(null) ==> object
>2. typeof(undefind) ==> undefind
>

### typeof两种写法

1. typeof(num)
2. typeof num  

## 数据类型转换

### 显示类型转换

#### Number(mix)

```javascript
var demo = "123";
var num = Number(demo);
console.log(num)
//结果： Number类型的123
```

> **注意**
>
> 1. Number(null) ==> 0
>
> 2. Number(undefind) ==> NaN
> 3. Number("123abc") ==> NaN
> 4. Number(true) ==>1
> 5. Number(false) ==>0

#### parseInt(String,radix)

> 以radix为基底，将String转换成10进制

```javascript
var num = parseInt("123ac");
console.log(num)
//结果： 123
var num1 = parseInt("b",16);
console.log(num1)
//将10当作16进制，转换成10进制
//结果:11
var num1 = parseInt("101010",2);
console.log(num1)
//将101010当作2进制，转换成10进制
//结果:42
```

> **注意**
>
> 1. parseInt(null) ==> NaN
>
> 2. parseInt(undefind) ==> NaN
> 3. parseInt("123abc") ==> NaN
> 4. parseInt(true) ==> NaN
> 5. parseInt(false) == > NaN

#### parseFloat(String)

```javascript
var num = parseInt("100.2abc");
console.log(num)
//结果： 100.2

```

#### Strig(radix)

> 将任何值都转换成字符串类型

```javascript
var num = String(123ac);
console.log(num)
//结果： Stringe类型的123abc

```

> **注意**
>
> 1. String(null) ==> String类型null
>
> 2. String(undefind) ==>String类型undefind

#### Boolean(radix)

> 将任何值都转换成布尔类型

```javascript
var num = Boolean(123ac);
console.log(num)
//结果：true
var num = Boolean(0);
console.log(num)
//结果：false
```

#### toString(radix)

```javascript
var demo = 123;
var num =demo.toString();
//结果： String类型123
var demo = 100;
var num = demo.toString(8);
console.log(num)
//结果： 144
```

> **注意**
>
> 1. undefind不能用toString
>
> 2. null不能用toString
>
> 3. .toString(8)将调用者当作10进制转换成8进制

#### toFixd()

> 保留小数位数,四舍五入
>
```javascript
var demo = 123.233333;
var num =demo.toFixed(2);
//结果： 123.23
```

### 隐式类型转换

#### isNaN()

> 先进行Number() --> 然后在判断是不是NaN

```javascript
var num = isNaN(null);
//Number(null) --> 0 不是NaN
//结果：false
var num = isNaN(undefind);
//Number(null) --> NaN 是NaN
//结果：true
```

#### ++/-- 、+/-

> 一元正负，先转换成Number

```javascript
var a = "123";
    a++;
    console.log(typeof(a))
//结果 ： number
var a = +"a";
    console.log(typeof(a))
//结果 ： number
var a = -"a";
    console.log(typeof(a))
//结果 ： number
```

#### +

> +号 先转换成String

```javascript
var a = "123" + 1;
    console.log(typeof(a))
//结果 ： String

```

#### -、* 、/ 、%

> 先转换成Number

```javascript
var a = "a" * 1;
    console.log(typeof(a))
//结果 ： number
var a = "a" - 1;
    console.log(typeof(a))
//结果 ： number
```

#### &&、||、!

> 先转换成Boolean

#### < 、> 、<= 、>=

> 先转换成number

```javascript
var a = "a" > 1;
    console.log(typeof(a))
//结果 ： boolean这里结果返回的布尔值，但是在比较时是先转换成number进行比较

```

#### == 、 !=

> 先转换成number进行比较返回结果为boolean
>


>**注意**
>
>1. === 不发生隐式类型转换
>
>2. !== 不发生隐式类型转换
>3. num 和 undedind 不能与数字比较（不发生隐式类型转换）
>4. NaN == NaN 返回结果为false

## 练习

1. alert(typeof(a))

```javascript
alert(typeof(a));
//结果： String类型undefind
```

2. alert(typeof(undefind))

```javascript
alert(typeof(undefind));
//结果： String类型undefind
```

3. alert(typeof(NaN))

```javascript
alert(typeof(NaN));
//结果： String类型number
```

4. alert(typeof(null))

```javascript
alert(typeof(null));
//结果： String类型object
```

5. var a = "123abc"; alert(typeof(+a)); alert(typeof(!!a)); alert(typeof(a + ""));

```javascript
var a = "123abc";
 console.log(typeof(+a))
//结果： String类型number
 console.log(typeof(!!a))
//结果： String类型boolean
 console.log(typeof(a + ""))
//结果： String类型String
```

6. alert(1 == "1")

```javascript
alert(1 == "1")
//结果：true
```

7. alert(NaN == NaN)

```javascript
alert(NaN == NaN)
//结果： false
```

7. alert(NaN == "undefind")

```javascript
alert(NaN =="undefind")
//结果： false
```

8. alert("11" + 11)

```javascript
 alert("11" + 11)
//结果： String类型的1111
```

9. alert(1 === "1")

```javascript
 alert(1 === "1")
//结果: false
```

10. parseInt("123abc")

```javascript
 parseInt("123abc")
//结果: number类型123
```

11. typeof(typeof(a))

```javascript
typeof(typeof(a))
//结果: string
```