# javascript 学习

## 脚本化css

> `dom.style.prop`

1. 可读写行间样式，没有兼容性问题，碰到float这样的保留字属性，前面加css （float == cssfloat）
2. 复合属性必须拆解，组合单词变成小驼峰写法
3. 写入的值必须是字符串格式

## 查询计算样式

> `window.getComPutedStyle(ele,null)`

1. 计算样式只读
2. 返回的计算样式的值都是绝对值
3. IE8及IE8以下不兼容

### 参数

>1. elem : 需要查询样式的属性
>2. null : 一般情况写null,查询伪类时需要将null换成伪类

## 查询样式

> `ele.currentStyle`

1. 计算样式只读
2. 返回的计算样式的值都是绝对值
3. IE独有

## 封装兼容方法

```javascript
function getStyle(elem,prop){
   if(window.getComputedStyle){
       return window.getComputedStyle(elem,null)[prop];
   }else{
       return elem.currentStyle[prop];
   }
}

```

## 操作伪类

```css
.demo::after{
    content:"";
    dispaly:block;
    background-color:yellow;
}
.demo1::after{
    content:"";
    dispaly:block;
    background-color:green;
}

```

```javascript
dom.onclick = function(){
    dom.calssName = "demo1"
}
```

## 事件

### 事件绑定处理函数

#### `ele.onXXX = function(){}`

>1. 兼容性好，但是一个元素的同一个事件只能绑定一个事件处理函数
>2. 基本等同于写在HTML行间上
>3. 程序this执向的是dom元素本身

#### `obj.addEventListenter(type,fn,bool)`

> 1. IE9以下浏览器不兼容，可以为一个事件绑定多个处理程序
> 2. 程序this执向的是dom元素本身

##### *参数

>1. type : 事件类型
>2. fn : 处理函数
>3. bool: 布尔值，当为false时为默认，事件冒泡执行，当为true时，事件捕获执行

#### `obj.attachEvent("on" + tyoe ,fn)`

> 1. IE独有，一个事件同样可以绑定多个处理函数
>2. 程序this执向的window

## 封装兼容性方法 `addEvent()`

```javascript
function addEvent(elem, type, handle) {
   if (elem.addEventListenter) {
       elem.addEventListenter(type, handle, false);
   } else if (elem.attachEvent) {
       elem.attachEvent('on'+ type, function () {
           handle.call(elem);
       })
   } else {
       elem['on' + type] = handle;
   }
}
```

### 解除事件处理函数

>1. `ele.onXXX = flase/ "" / null`
>2. `ele.removeEventListenter(type,fn,boll)`
>3. `ele.detachEvent('on'+ type,fn)`

## 封装兼容性方法 `removeEvent()`

```javascript
function removeEvent(elem, type, handle) {
   if (elem.removeEventListener) {
       elem.removeEventListener(type, handle, false)
   } else if (elem.detachEvent) {
       elem.detachEvent('on' + type, handle);
   } else {
       elem['on' + type] = null;
   }
}
```

## 事件冒泡

> 代码结构上（非视角）嵌套关系的元素，会存在事件冒泡的功能，即同一个事件，自子元素冒泡到父元素（自底向上）

```HTML
<div class="box">
    <div calss="box1"></div>.
</div>
```

```javascript
box.onclick = function(){
    console.log("我是box")
}
box1.onclick = function(){
    console.log("我是box1")
}
//点击box1发发生冒泡功能 返回结果为 ： "我是box1" 、"我是box"
```

## 事件捕获

> `elem.removeEventListener(type, handle, true)`
> 代码结构上（非视角）嵌套关系的元素，会存在事件捕获的功能，即同一个事件，自父元素冒泡到子元素

```HTML
<div class="box">
    <div calss="box1"></div>.
</div>
```

```javascript
box.onclick = function(){
    console.log("我是box")
}
box1.onclick = function(){
    console.log("我是box1")
}
//点击box发发生冒泡功能 返回结果为 ： "我是box" 、"我是box1"
```

### 注意

> 1. 触发顺序为，先捕获，后冒泡
> 2. focus blur change submit reset select 等事件没有冒泡事件

## 取消冒泡事件

> 1. W3c标准， `event.stopPropagation()`,但不支持IE9以下版本
> 2. IE独有`window.event.cancelBubble() = true`

### 封装取消冒泡事件

```javascript
function stopBubble(event){
   event = event || window.event;
   if(event.stopPropagation){
       event.stopPropagation();
   }else{
     event.cancelBubble = true
   }
}
```

## 阻止默认事件

> 表单事件，a标签跳转，右键菜单等

1. `return false` 以对象属性的方式注册的事件生效
2. `event.preventDefault()`W3c标准，IE9以下不兼容
3. `event.returnValue = false` 兼容IE

### 封装阻止默认事件

```javascript
function stopDefault(e) {
   e = e || window.event;
   if (e && e.preventDefault) {
       e.preventDefault();//防止浏览器默认行为(W3C) 
   } else {
       e.returnValue = false;//IE中阻止浏览器行为 
   }
}
```

## 事件对象

> `event || window.event`//兼容性写法

## 事件源对象

>1. `event.target` 火狐只有这个
>2. `event.srcElement`IE只有
>3. 谷歌两个都有

### 兼容性写法

> `var target = event.target || window.event.srcElement`

## 事件委托

> 利用事件冒泡和事件源对象进行处理

### 优点

1. 性能好，不需要循坏所有元素来一个个绑定
2. 灵活，当有性元素时不需要重新绑定事件

```HTML
 <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```

```javascript
var box = document.getElementsByTagName("ul")[0];
    box.onclick =function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    console.log("点击LI也会触发")
    }
```

## 事件分类

### 鼠标事件

> `clik mousedown mousemove mouseup comtextmenu mouseover mouseout mouseenter mouseleave`

### 判断鼠标左右键（0 1 2）

```javascript
document.onmousedown = function (e) {
   e = e || window.event;
   switch (e.button) {
       case 2:
           console.log("右键");
           break;
       case 0:
           console.log("左键");
           break;
       case 1:
           console.log("中键");
           break;
   }
}
```

### DOM3标准，click事件只能监听左键，鼠标右键只能通过mousedown 和mouseup

## 解决`click`与`mousedown`冲突

```javascript
var fristtime = 0,
   lasttime = 0,
   key = true;
document.onmousedown = function () {
   fristtime = new Date().getTime();
}
document.onmouseup = function () {
   lasttime = new Date().getTime();
   if (lasttime - fristtime < 300) {
       key = true;
   }
}
document.onclick = function () {
   if (key) {
       key = false;
   }
   console.log(1)
}
```

## 键盘事件

> `keydown keyup keypress`

1. `keydown > keypress > keyup`

### keydown 与 keypress 的区别

1. `keydwon`可以响应任意键，`keypress`只能响应字符类键
2. `keypress`返回ASCII码，可以转换成相应的字符

```javascript
document.onkeypress = function(e){
  e = e || window.event;
  console.log(String.fromCharCode(e.keyCode))
}
```

## 文本类操作事件

> `input focus blur change ...`

```HTML
<input type="text" value="输入" 
onfocus="if(this.value == '输入'){this.value=''}"
onblur="if(this.value == ''){this.value='输入'}"
>
```

## 窗体(window)操作事件

> `scroll load`

