# javascript 学习

## json

> JSON是一种传输数据的格式（以对象为样板，本质上就是对象，但是用途有区别，对象就是本体用的，JSON是用来传输的）

1. `JSON.peare()` String -- JSON

```javascript
var str = '{"name" : "田","age" : 18}';
  console.log(JSON.parse(str))//返回结果为 { age :18,name : "田"}
```

2. `JSON.stringify()` JSON -- String

```javascript
var obj = {
  "name" : "田",
  "age" : 18
  }
console.log(JSON.stringify(obj))//返回结果为 "{"name":"田","age":18}"
```

## 浏览器渲染过程

> DOM树  + css树 = rander树
>
### 1. 生成DOM树

>当文档解析时，先将所有标签和挂到DOM树上

```javascript
              DOM树
     |                    |
    head                 body
 |        |          |           |
title   mate .. |   div         div .....
                     |
                    p ..
```

### 2. 生成css树

>当DOM树构建好后，构建css树

### 2. 渲染生成rander树

>当css树构建好后，构建rabder树，开始渲染

## reflow 页面重构

> dom节点的删除，添加；dom节点的宽高变化，位置变化，display offsetWidth offsetLeft 都会引起rander树的重构消耗性能

## repaint重绘

> 改变颜色之类

## 异步加载js

### js加载的缺点

1. 加载工具方法没必要阻塞文档，过多的js加载会影响页面效率，一旦网速过慢，那么整个网站将等待js加载而不进行后续渲染等工作

### 有些工具方法需要按需加载，用到时再加载

#### js异步加载的三种方案

##### 1. `defer`，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成

```javascript
<script src="tools.js" defer></script>
<script defer>
    console.log("异步")
</script>
```

##### 2.    `async`，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）

```javascript
<script src="tools.js" async></script>
```

<img src="./images/SC.jpg"/>

##### 3. 创建script，插入到DOM中，完毕后callback

```javascript
var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "tools.js";
script.onload = function(){
   document.head.appendChild(script);
}
```

#### 封装异步加载js方法

```javascript
function loadScript(url,callback){
   var script = document.createElement("script");
       script.type ="text/javascript";
       if(script.readyState){
           script.onreadystatechange = function (){
               if(script.readyState == "complete" || script.readyState == "loaded"){
                   callback();//第一种
                   tools[callback]();//第二种
               }
           }
       }else{
           script.onload = function (){
               callback();//第一种
               tools[callback]();//第二种
           }
       }
       script.src = url;
       document.head.appendChild(script);
}
//使用
loadScript("demo.js",function(){})
/*
demo.js种
tools = {
   test : function(){}
}
loadScript("demo.js","test")
*/
```

## 浏览器加载时间线

> 1. 创建Document对象，开始解析Web页面，解析HTML元素和他们的文本内容后，添加Element对象和text节点到文档中，这个阶段 `document.readyState = "loading"`
>
> 2. 遇到link外部的css，创建线程加载，并解析文档
> 3. 遇到script外部js,并没有设置`async defer`,浏览器加载会发生阻塞。等待js加载完成并执行脚本，然后继续解析文档
> 4. 遇到script外部js,并设置有`async defer`，浏览器创建线程，并继续解析文档，对于有async属性的脚本，脚本加载完成后立即执行，defer等文档全部解析完开始执行（异步禁止使用document.write()）
> 5. 遇到img标签，浏览器先创建线程，并异步加载src,并继续解析文档
> 6. 当文档解析完，`document.readyState = "interactive"`
> 7. 文档解析完后，所有设置defer的脚本开始执行，（异步禁止使用document.write()））
> 8. `document`对象触发DOMContentLoaded事件，这也标志着程序从同步脚本执行阶段，转化为事件驱动阶段
> 9. 当所有`async`的脚本加载完成并执行完，img等加载完成后，`document.readyState = "complete"`,window对象触发事件
> 10. 从此，异步响应方式处理用户输入，网络事件

## 正则

> 正则表达式是由一个字符序列形成的搜索模式

### 语法

> /正则表达式主体/修饰符（可选）

### 修饰符

<table>
    <tr >
        <th>修饰符</th>
        <th>介绍</th>
    </tr>
    <tr>
        <td>`i`</td>
        <td> 匹配大小写</td>
    </tr>
    <tr>
        <td>`g`</td>
        <td> 匹配全局</td>
    </tr>
    <tr>
        <td>`m`</td>
        <td> 匹配多行</td>
    </tr>
    
</table>

### 方括号 `[]`

<table>
    <tr >
        <th>方括号</th>
        <th>介绍</th>
    </tr>
    <tr>
        <td>`[abc]`</td>
        <td> 查找方括号之间字符</td>
    </tr>
    <tr>
        <td>`[^abc]`</td>
        <td> 查找不包括方括之间的字符</td>
    </tr>
    <tr>
        <td>`[0-9]`</td>
        <td> 查找0到9之间的字符</td>
    </tr>
    <tr>
        <td>`[a-z]`</td>
        <td> 查找小写a到小写z的字符</td>
    </tr>
     <tr>
        <td>`[A-Z]`</td>
        <td> 查找大写A到大写Z的字符</td>
    </tr>
     <tr>
        <td>`(a|b|c)`</td>
        <td> 查找指定选项</td>
    </tr>
</table>

### 元字符

<table>
    <tr >
        <th>元字符</th>
        <th>介绍</th>
    </tr>
    <tr>
        <td>`.`</td>
        <td>查找单个字符，除了换行符和行结束符</td>
    </tr>
    <tr>
        <td>\w</td>
        <td>查找单词字符</td>
    </tr>
    <tr>
        <td>\W</td>
        <td>查找非单词字符</td>
    </tr>
    <tr>
        <td>\d</td>
        <td>查找数字</td>
    </tr>
     <tr>
        <td>\D</td>
        <td> 查找非数字</td>
    </tr>
     <tr>
        <td>\s</td>
        <td>查找空白字符</td>
    </tr>
     <tr>
        <td>\S</td>
        <td>查找非空白字符</td>
    </tr>
     <tr>
        <td>\b</td>
        <td>查找单词边界</td>
    </tr>
    <tr>
        <td>\B</td>
        <td>查找非单词边界</td>
    </tr>
    <tr>
        <td>\n</td>
        <td>查找换行字符</td>
    </tr>
    <tr>
        <td>\f</td>
        <td>查找换页符</td>
    </tr>
    <tr>
        <td>\r</td>
        <td>查找回车符</td>
    </tr>
    <tr>
        <td>\t</td>
        <td>查找制表符</td>
    </tr>
    <tr>
        <td>\v</td>
        <td>查找垂直制表符</td>
    </tr>
    <tr>
        <td>\XXX</td>
        <td>查找垂直制表符</td>
    </tr>
</table>

