## mockjs学习文档
http://mockjs.com/

### 文件说明
```
index.js 所有文件集合
mock-prod 生产环境启动信息
mock-dev 本地开发环境启动信息
其它目录，数据编写文件，数据格式为json数组
如下：
{
    // 请求的URL
    url: "/login",
    // 请求类型, post, put, get, delete
    type: "post",
    // 响应数据，参数为请求信息（请求头，请求数据等）
    response: function(request) {

    }
}

```

