# jvvascript 学习

## Date日期对象

> `Date()`封装函数，返回日期和时间

### `date = new DAte()`

> 1. `date.getDate()`返回一个月某一天
>
> 2. `date.getDay()`返回一周中的某一天（0 - 6）
> 3. `date.getMoth()` 返回月份（0 - 11）
> 4. `date.getYear()` 返回年份（两位数）
> 5. `date.getFullYear()`返回四位数年份
> 6. `date.G+Hours()`返回小时（0 - 23）
> 7. `date.getMinutes`返回分钟（0 - 59）
> 8. `date.getSeconds()`返回秒数
> 9. `date.getMillSeconds()`返回毫秒数
> 10. `date.getTime()`返回1970年1月1日的毫秒数
> 11. `date.setDate()`返回一个月某一天
> 12. `date.setTime()`以毫秒数设置Date对象

## js定时器

### steINterval(fun,time)

> 按照一定的周期（毫秒计），来调用函数或表达式

#### 参数

1. fun : 要调用的函数或表达式
2. time : 函数或表达式执行所用的周期（毫秒计）

### setTimeout（fun,time）

> 指定的毫秒数后执行调用函数或表达式

#### 参数*

1. fun : 要调用的函数或表达式
2. time : 函数或表达式执行前所等的毫秒数

### clearInterval(sele)

> 清除定时器

#### *参数

1. sele : setInterval()返回的ID值

### clearTimeout(sele)

> 清除setTimeout()定时器

#### *参数*

1. sele : setTimeout()返回的ID值

## 计时器三分钟停止

```javascript
var count = 0,
  min = 0;
var timer = setInterval(function(){
  count ++;
  if(count == 60){
      count = 0;
      min ++;
  }
  if(min == 3){
      clearInterval(timer)
  }
},10)
```

## 获取滚动条滚动距离

> 1. `wwindow.pageXoffset/pageYoffset` IE8及IE8以下浏览器不兼容
>
> 2. `document.body/documentElement.scrollLeft/srollTop` 兼容性比较混乱，用时取两个值相加，因为不可能存在两个同时两个都有值

### 封装兼容方法，求滚动条滚动距离

```javascript
function getScrollOffset() {
   if (window.pageXOffset) {
       return {
           x: window.pageXOffset,
           y: window.pageYOffset
       }
   } else {
       return {
           x: document.body.scrollLeft + document.documentElement.scrollLeft,
           y: document.body.scrollTop + document.documentElement.scrollTop
       }
   }
}
```

## 查看可视窗口尺寸

> 1. `window.innerWidth.innerHeight` IE8及IE8以下不可用
>
> 2. `documnent.documentElement.clienWidth/clientHeight` 标准模式（有<!DOCYYPE html>）任意浏览器都兼容
> 3. `document.body.clientWidth/clientHeight` 怪异模式（没有<!DOCYYPE html>）下兼容浏览器

### 封装兼容性方法，获取可视窗口尺寸

```javascript
function getViewProtoffset() {
   if (window.innerWidth) {
       return {
           W: window.innerWidth,
           H: window.innerHeight
       }
   } else {
       if (document.compatMode == "BackCompat") {
           return {
               W: document.body.clientWidth,
               H: document.body.clientHeight
           }
       } else {
           return {
               W: document.documentElement.clientWidth,
               H: document.documentElement.clientHeight
           }
       }
   }
}
```

## 获取元素几何尺寸

### `Element.getBoundingClientRect()`

1. 兼容性好
2. 该方法返回一个对象，对象里面有top,left,right,bottom,等属性，left和top代表该元素距离左上角的X坐标Y坐标，right和bottom代表元素距离右上角X和Y的坐标
3. height与width属性老版本Ie并未实现（可用该属性获取到right - left 求width，bottom - top 求height）
4. 返回的结果不是实时的

## 查看元素的尺寸

> 1. `offsetWidth` 获取的是（paddding + width）
> 2. `offsetHeight` 获取的是（paddding + height）

## 查看元素位置

 1. `offsetLeft/offsetTop`

> 对于无定位父级的元素，返回相对于文档的坐标，对于有定位元素的父级返回相对于最近有定位的父级元素

2. `offsetParent`

> 返回最近的有定位的父级，如无父级返回body,

## 封装方法，求元素相对文档的坐标 （getElementPosition()）

```javascript
function getElementPosition(elem) {
   var arr = [],
       arr1 = [],
       num = 0,
       num1 = 0;
   for (elem = elem; elem != null; elem = elem.offsetParent) {
       arr.push(elem.offsetLeft);
       arr1.push(elem.offsetTop);
   };
   for (var i = 0; i < arr.length; i++) {
       num += arr[i];
       num1 += arr1[i];
   }
   return {
       X: num,
       Y: num1
   }
}
```

## 滚动条滚动

> 1. window上有三个方法

1. `scroll(x,y)`
2. `sscrollTo(x,y)`
3. `scrollBy(x,y)`

> 2. 三个方法功能类似，用法都是将x,y坐标传入，即实现让滚动条滚动到当前位置
> 3. 区别：`scrollBy(x,y)`会在之前值上累加

### 利用scrollBy()实现自动阅读功能

```javascript
var timer = setInterval(function(){
              window.scrollBy(0,10);
            },100)
```
