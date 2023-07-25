# douyincloud-nodejs-koa-demo
本项目是抖音云平台基于 Nodejs [koa](https://koajs.com/) 框架的开发模版，模版实现了简单的云调用与获取openID的功能。\
抖音云平台支持基于 Git 代码和 Docker 镜像部署两种方式。其中，Dockerfile 文件可以参考本项目中的 Dockerfile 文件。
部署在抖音云平台的服务日志需要重定向到标准输出，并在抖音云平台日志功能中查看。

## 目录结构
~~~
.
├── Dockerfile              Dockerfile文件
├── Readme.md               Readme文件
├── src                     源码目录
│ ├── server.ts             应用入口文件
├── run.sh                  容器运行时启动文件
├── package.json            npm 包管理文件
~~~

## 请求方法
前往抖音云托管平台「调试」功能界面，进行请求调试。

## API说明
### `GET /api/get_open_id`
获取openid，当未绑定用户时会返回获取openid失败的错误


### 响应结果
```json
{
    "err_no": 0,
    "err_msg": "success",
    "data": "719f****-****-4c**-a0**-*********"
}
```

### `POST /api/text/antidirt`
云调用示例，调用抖音开放平台的OpenApi进行脏词检测

### 请求参数
- `content`:`string` 待检测的内容

### 响应结果
```json
{
    "err_no": 0,
    "err_msg": "success",
    "data": ""
}
```

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

