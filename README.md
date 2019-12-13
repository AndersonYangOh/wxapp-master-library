# wxapp-mobile-library
微信小程序后端http服务，与mongodb数据库操作
# 技术栈
- **Express** : http服务框架
- **websocket**: 前后端消息的实时推送
- **mongoose**: 操作mongodb数据库
- **pm2**: 服务端使用pm2部署，常驻进程

# 使用pm2部署
安装pm2
```
npm install  -g pm2
```
启动应用
```
pm2 start app.js
```
# 说明
小程序后端采用Node.js + MongoDB架构，已经过小规模的测试，核心的功能暂时没有发现问题，但是不排除在用户量增大后出现不可预知的bug，如果在使用过程中发现问题欢迎随时反馈。
