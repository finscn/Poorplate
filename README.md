Poorplate
=========

A simple JS template toolkit

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


当然 ,也支持多层属性, 例如这样:

```
{{aaa.bbb.ccc}}
```

数据:

```
var data = {
	aaa : {
		bbb : {
		  ccc : "foo"
		}
	}
}

```
如果有数组, 那么占位符这样写:

```
{{aaa.1.bbb}}
```

数据对象

```
var data = {
	aaa : [ 123, { bbb : "foo" } ]
}

```

我知道这很丑, 写成 ` {{aaa[1].bbb}}` 更好, 但是一切为了代码的精简 (其实是我懒).





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

gender 为data对象的属性, 表达式为标准的js表达式.

foo 为在外部定义的函数, 函数的返回值用来做替换. 

注意: runTemplate的第三参数不适用于函数的情况.

====================

更多信息详见代码 和 example.html



.
.
.




