const express = require('express');
const basicAuth = require('express-basic-auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello, world!</h1><p>Đã Dockerize và Deploy thành công bởi bé Mây 🌙</p>');
});

const auth = basicAuth({
  users: { [process.env.USERNAME || 'admin']: process.env.PASSWORD || 'secret' },
  challenge: true,
  unauthorizedResponse: () => 'Sai tài khoản rồi anh ơi! ❌'
});

app.get('/secret', auth, (req, res) => {
  res.send(`<h1>Khu vực bảo mật 🔐</h1><p>Tin nhắn mật: ${process.env.SECRET_MESSAGE || 'Chưa cấu hình tin nhắn mật'}</p>`);
});

app.listen(port, () => {
  console.log(`App chạy tại http://localhost:${port}`);
});