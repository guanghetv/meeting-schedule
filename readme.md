# meeting-schedule
会议室预定、预览

## node version
8.9.4

## 后端启动
* cd server
* npm install
* pm2 start process.json

### db

```javascript
{
    user: 'meeting',
    database: 'meeting',
    host: '10.8.8.8',
    password: 'lovemeeting?',
    port: 5432,
    max: 10
}
```

## 前端启动
* cd watchDog
* npm install
* npm run build
