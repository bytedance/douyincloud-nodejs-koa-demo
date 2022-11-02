# douyincloud-nodejs-koa-demo
本项目是抖音云平台基于 Nodejs [koa](https://koajs.com/) 框架的开发模版，模版通过使用 Redis 和 MongoDB 实现了简单的 hello-world 功能。\
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
### `POST /api/set_data_to_redis?key=test`
调用 redis 组件设置数据，其中 key 通过 query 传递，value 在 HTTP request body中传递
### 请求参数
- `value`:`string` 写入redis的数据


### 响应结果
```json
{
    "success": true,
}
```

### `GET /api/get_data_from_redis?key=test`
调用 redis 组件获取 value
### 请求参数
- `key`:`string` redis key

### 响应结果
```json
{
    "success": true,
    "data": "",
}
```

### `POST /api/set_data_to_mongodb?name=test`
调用 mongodb 组件写入数据
### 请求参数
- `name`:`string` 写入mongodb的数据


### 响应结果
```json
{
    "success": true,
}
```

### `GET /api/get_data_from_mongodb?name=test`
调用 mongodb 组件获取数据
### 请求参数
- `name`:`string` 

### 响应结果
```json
{
    "success": true,
    "data": {},
}
```

### 组件使用注意事项
在抖音云托管平台上启用组件后，抖音云平台会自动将组件的地址，账号，密码以环境变量的方式注入到容器中。\
以Redis为例，在抖音云托管平台启用Redis组件后，平台会生成 `REDIS_ADDRESS`，`REDIS_USERNAME`，`REDIS_PASSWORD`三个环境变量，在业务代码中可以使用如下代码获取相应值。
```js
	const redisAddr = process.env.REDIS_ADDRESS;
	const redisUserName = process.env.REDIS_USERNAME;
	const redisPassword = process.env.REDIS_PASSWORD; 
```

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

