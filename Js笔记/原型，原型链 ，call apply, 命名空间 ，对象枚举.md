# javascript 学习

## 原型（prototype）

> 原型是`function`对象的属性。原型是构造函数构造出来对象的公共祖先。通过该构造函数产生的对象，可访问该原型的属性和方法，原型也是对象

```javascript
function Person(){

}
Person.prototype.name = "田"
var person1 = new Person();
var person2 = new Person();
person1.name == "田"
person2.name == "田"
```

### 利用原型的特点和概念可以提取公有属性

```javascript
Car.prototype.name = "BWM";
Car.prototype.height = 1400;
Car.prototype.wight = 400;
function Car(color){
    this.color = color;
}
var car1 = new Car("red")
var car2 = new Car("bule")
car1.name == "BWM"
car2.name == "BWM"
ca1.height == 1400;
ca2.height == 1400;
```

### constructor

> 对象用constructor来查看自己的构造函数（谁构造了它）

```javascript
function Person(){

}
function Car(){

}
var car1 = new Car();
car1.constructor //返回函数 f Car(){}
//可以修改constructor
Car.prototype = {
    constructor : Person//这是car1.constructor //返回函数 f Person(){}
}
```

### 对象如何查看原型 ==>隐式属性 ==>  (`_proto_`)

> new构造函数返回一个对象，对象中隐式创建一个this对象，this对象中添加一个属性 `_proto_` 属性值为prototype

```javascript
function Person(){
    //var this {_proto_ ：prototype}
}
Person.prototype.name = "suuny";
//第一种
var person = new Person();
Person.prototype.name = "cherry";
//结果 ： person.name == cherry

//第二种
var person = new Person();
Person.prototype = {
    name : "cherry"
}
//结果 ： person.name == suuny 引用值

//第三种
Person.prototype = {
    name : "cherry"
}
var person = new Person();
//结果 ： person.name == cherry 执行顺序
```

## 原型链

### 如何生成原型链

```javascript
Grand.prototype.Lastname = "tian";
function Grand(){};
var grand = new Grand();
Father.protoytype = grand;
function Father(){
    this.name = "wen";
}
var father = new Father();
Son.prototype = father;
function Son(){}
var son = new Son();
//这里就形成原型链

```

#### 注意

> 原型链上的属性可增删改查
>
> 绝大多数对象最终都会继承自`object.prototype`
>
> object.create(原型) ==> 创建原型 这里可以是原型也可以是null(少数为null)

## call / apply

>* 两者作用是改变this指向
>* 两者的区别是，后面传入的参数不同

```javascript
function Person(name, sex){
    this.name = name,
    this.sex = sex
}
function Student(age,hiddly){
    Person.call(this,name,sex)
    this.age = age,
    this.hiddly = hiddly
}
var student = new Student("田","男","18","唱歌")
```

### *注意

> `call(this执行谁,参数，...)`
>
>`apply(this执行谁,[]/agguments)`
>
> call需要把实参按照形参的个数传进去
>
> apply 需要传一个arguments

## 继承模式

### 继承发展史

#### 传统形式(原型链)

* 过多的继承了没有用的属性

```javascript
Grand.prototype.Lastname = "tian";
function Grand(){};
var grand = new Grand();
Father.protoytype = grand;
function Father(){
    this.name = "wen";
}
var father = new Father();
Son.prototype = father;
function Son(){}
var son = new Son();
//这里通过原型链一步一步继承
```

#### 借用构造函数

* 不能继承借用构造函数的原型
* 每次构造函数都要多走一次

```javascript
function Person(name,age){
    this.name = name,
    this.age = age
}
function Student(sex){
    Person.call(this,name,age);
    this.sex = sex
}
var Student = new Student("田",18,"男")
```

#### 共享原型

* 不能随便改动自己的原型

```javascript
function Father(){
    this.xing = "田";
}
function Son(){
    this.name = "文";
}
Father.prototype = Son.prototype
```

#### 圣杯模式

```javascript
var inherit = (function(){
    var F =function (){}
    return function (Target,Origin){
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype
    }

}())
```

## 命名空间

> 管理变量，防止污染全局变量，适用于模块发开发

```javascript
var name = "bcd"
var init = (function () {
  var name = "abc";
  function callName() {
      console.log(name);
  }
  return function () {
      callName();
  }
}())
init();
/*
 开始：
  0:GO{
      name : "bcd",
      init :function () {
              callName();
           }
  }

  立即执行函数触发 将calssName 执行赋值给init
  init执行触发callName执行

  callName的执行
  0：AO{
      name :"abc",
      callName :function callName() {
                  console.log(name);
              }
  }
  1:GO{
      name : "bcd",
      init : callName();
  }
  执行完后，callName取消连接等待下次执行
*/
```

### 注意*

> 这里用到闭包，将变量定义到闭包里面，立即执行函数执行完后释放，最后将方法返回给变量，执行变量来执行方法。这样就不会污染变量

## 对象枚举

### for in

>用来遍历对象

```javascript
var obj = {
    name : "tian",
    age : 18
}
for(var prop in obj){
    console.log(obj[prop])//这里的prop是变量，如果用点，会执行obj["prop"]
}
```

#### **注意

> obj.name ==> obj['name']

### hasOwnProperty()

> 判断是否为在自己的舒属性（是否有原型上的属性）

```javascript
var obj = {
    name : "tian",
    age : 18
}
for(var prop in obj){
  if(obj.hasOwnProperty(prop)){
    console.log(obj[prop])//这里的prop是变量，如果用点，会执行obj["prop"]
  }
  //这里true里面不会打印原型上的属性，else里面只打印原型上的属性

}
```

### in

> 判断对象中是否存存在那个属性

```javascript
    'name' in obj //不会判断原型上的属性
```

### instanceof

> `A instanceof B`
>
> 判断A对象的原型链上是否有B的原型

```javascript
function Person(){

}
var person = new Person();
person instanceof Person //返回true，person的原型链上有Person的原型
[] instanceof Array //返回true
{} instanceof Object //返回true

```

## this

> 1. 预编译过程中this --> window
>
> 2. 全局作用域里this --> window
> 3. call/apply 可以改变this的指向
> 4. obj.f() this指向obj
>`var obj = { f: function(){}}`

## 练习

1. 判断数组和对象

```javascript

//第一种
[].constructor//返回 function Array (){}

{}.constructor//返回 function object (){}

//第二种

[] instanceof Array //返回 true

{} instanceof Array //返回 false

//第三种

Object.prototype.toString.call([]) //返回 "[object Array]"

Object.prototype.toString.call({}) //返回 "[object Object]"
```

2. 写出下列执行结果

```javascript
var f = (
   function f(){
       return "1";
   },
   function g(){
       return 2;
   }
)()
console.log(typeof(f))//number
/*
   逗号运算符，返回后面表达式的结果
   所以左后在执行g
*/
```

3. 下列表达式结果为true的是

```javascript
A : undefined == null //为true
B : undefined === null //false
C : isNaN("100") //为false
D : parsetInt("1a") == 1 //为true
// {} == {} 返回值为false 引用值，样子一样，但是是不同的房间

```

4. 请写出代码输出结果

```javascript
var name = "222";
var a = {
   name : "111",
   say : function(){
       console.info(this.name)
   }
}
var fun = a.say;
fun();//222
a.say();//111
var b = {
   name : "333",
   say : function (fun){
       fun();
   }
}
b.say(a.say);  //222 ==> 这里最后执行fun 由于没有this调用，所以执行时走预编译。this  --> window
b.say = a.say;
b.say();//333
```

5. 写出下列执行结果

```javascript
var a = 5;
function test(){
   a = 0;
   alert(a);
   alert(this.a);
   var a;
   alert(a);//0
}
/*
tets()
AO:{
   a : 0, 
}
G0:{
   a : 5,
   test : function test(){}
}
0， 5(预编译阶段this指向window)， 0
new test();
AO:{
   this: {},
   a : 0
}
0, undefined, 0
*/
```

6. 写出下列执行结果

```javascript
var bar = {
   a: "002"
};
function print(){
   bar.a  = 'a';
   Object.prototype.b = 'b';
   return function inner(){
       console.log(bar.a);//a
       console.log(bar.b);b
   }
}
print()();
```