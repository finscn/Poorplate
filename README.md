Poorplate
=========

a simple JS template toolkit

该工具非常简单, 就是把一段文本中的 `{{属性名}}` 替换成`数据对象`中相应的属性值

当然 , {{ 和 }} 这两个标志符是可以自定义的.


======================

## 简单的示例



template字符串

```
        Name: {{name}}        
        Age: {{age}}
        Gender: {{gender}}
```

数据对象

```
    var data = {
            name: "Rocky",
            age: "20",
            gender: "m"
        };
```

执行替换

```
var pp= new Poorplate();
// 预编译模板
var compiled = pp.compileTemplate(template);
// 执行编译后的模板
var newText = pp.runTemplate(compiled, data);
```

此时 newText 为

```
        Name: Rocky        
        Age: 20
        Gender: m
```


## 稍微高级一点的示例

`runTemplate`函数有第三个参数: 当属性值为null 或 undefined 时, 显示什么


数据对象

```
// gender 为 null
    var data = {
            name: "Rocky",
            age: "20",
            gender: null
        };
```

执行替换

```
var pp= new Poorplate();
// 预编译模板
var compiled = pp.compileTemplate(template);
// 执行编译后的模板, 注意看第三个参数
var newText = pp.runTemplate(compiled, data, "--Unknown--");
```

此时 newText 为

```
        Name: Rocky        
        Age: 20
        Gender: --Unknown--
```


## 更高级一点的示例

模板中可以包含简单的代码和表达式

比如这样: 注意紧接着 {{ 的那个`@`

```
     Title: {{@ gender=="m"?"Mr":"Miss" }}
     Time: {{@ foo(data) }}
```

gender 为data对象的属性, 表达式为标准的js表达式
foo 为在外部定义的函数, 函数的返回值 会替换

====================

更多信息详见代码 和 example.html



.
.
.




