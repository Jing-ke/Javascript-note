# URL设计

## Web项目中，URI包括但是不限：
    链接地址（a标签的href属性）

    图片的源（img标签的src属性）

    多媒体文件的源（object标签的src属性）

    CSS，JavaScript地址（link标签的href 属性，script标签的src属性）

## URI中常见的问题
* 难以输入
* URI不必要的冗长
* 目录路径太深
* 莫明其妙的大写字
* 不常见的标点符号
* 在纸介质上显示很困难（~ | `）
* 主机和端口的问题 (在设计过程中避免主机以及端口号的显示)

## 设计URI应该遵循的原则
* 简单，好记的域名
* 简短（short）的URI
* 容易录入的URI
* URI能反应站点的结构
* URI是可以被用户猜测和hack的（也鼓励用户如此）
* 永久链接，Cool URI don’t change
* 简短精悍
    > 为了URI能被方便的录入，写下，拼写和记忆，要求URI要尽可能的短 
根据w3c提供的参考数据，一个URI的长度最好不要超过80个字节（这并非一个技术限制，经验和统计提供的数据），算上schema和host,port等。
* 大小写策略
    > URI的大小写策略要适当，要么全部小写，要么首字母大写，应避免混乱的大小写组合 **在Unix世界，文件路径队大小写是敏感的**，而在Windows世界，则不对大小写敏感 
* 允许URI管理 (URI映射是一种较老的体系)
    *  管理员可以重新组织服务器上的文件系统结构，而无需改动URI，这就需要URI和真实的服务器文件系统结构之间有一个映射机制，而不是生硬的对应。

    这种映射机制可以通过如下技术手段实现： 
    > Aliases，别名，Apache上的目录别名，IIS上的虚拟目录 

    >Symbolic links，符号链接，Unix世界的符号链接 

    >Table or database of mappings，数据库映射，URI和文件系统结构的对应关系存储在数据库中
* 标准的重定向
* 管理员可以简单的通过修改HTTP状态代码来实现服务器文件系统结构变更之后的URI兼容
    * 可以利用的HTTP Status Code有：
    > 301 Moved Permanently ([RFC2616] section 10.3.2)

    >302 Found (undefined redirect scheme, [RFC2616] Section 10.3.3)

    >Temporary Redirect ([RFC2616] Section 10.3.8)
* 用独立的URI ( 技术无关的URI )
* 提供动态内容服务时，应使用技术无关的URI
    > 即URI不暴露服务器端使用的脚本语言，平台引擎，而这些语言，平台，引擎的变化也不会导致URI的变更。因此，sevelet,cgi-bin之类的单词不应该出现在URI中。
* 提供静态内容服务时，应当隐去文件的扩展名
    > 取而代之的技术是content-negotiation, proxy, 和URI mapping。
* 身份标志和Session机制
    > 使用标准的身份认证机制，而不是每个用户一个特定的URI
* 使用标准的Session机制，而不是把Session ID放在URI中
    > 使用Tomcat和PHP3的站点容易犯这类错误，将Session ID放在URI中，实际上，他们应当用HTTP Header来实现之。
* 内容变更时使用标准转向
    > 对变更的内容使用标准的重定向
* 对删除的资源使用HTTP410
    > 提供索引代理 
    
    >索引策略

    >Content-Location

    >Content-MD5
* 提供适当的缓存信息 
    >缓存相关的HTTP头 

    >缓存策略

    >缓存生成内容

    >HTTP HEAD和HTTP GET
* 
