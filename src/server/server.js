import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import connectDB from './db.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

connectDB();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
});

const Account = mongoose.model('Account', userSchema, 'accounts');

app.post('/register', async (req, res) => {
  // console.log('B1: Gọi API /register với:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // console.log('B2: Thiếu thông tin, trả về 400');
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      // console.log('B3: MongoDB chưa kết nối');
      throw new Error('MongoDB chưa kết nối');
    }

    // console.log('B4: Kiểm tra username/email tồn tại');
    const existingUser = await Account.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      // console.log('B5: Người dùng đã tồn tại:', existingUser.username);
      return res.status(400).json({
        message: existingUser.username === username ? 'Tên người dùng đã tồn tại' : 'Email đã tồn tại',
      });
    }

    // console.log('B6: Tạo user mới:', { username, email });
    const newUser = new Account({ username, email, password });
    await newUser.save();
    // console.log('B7: Đã lưu user:', { username, email, id: newUser._id });

    if (!newUser.username || !newUser.email) {
      // console.log('B8: Dữ liệu user không hợp lệ:', newUser);
      throw new Error('Dữ liệu user không hợp lệ sau khi lưu');
    }

    let token;
    try {
      // console.log('B9: Tạo JWT cho:', newUser._id);
      token = jwt.sign(
        { userId: newUser._id.toString() },
        process.env.JWT_SECRET || 'my_very_secure_secret_key_1234567890',
        { expiresIn: '1h' }
      );
      // console.log('B10: JWT tạo thành công:', token.slice(0, 20) + '...');
    } catch (jwtError) {
      // console.error('B11: Lỗi tạo JWT:', jwtError);
      return res.status(201).json({
        user: { username: newUser.username, email: newUser.email, avatar: newUser.avatar },
        warning: 'Đăng ký thành công nhưng không tạo được token',
      });
    }

    res.status(201).json({
      token,
      user: { username: newUser.username, email: newUser.email, avatar: newUser.avatar },
    });

  } catch (error) {
    if (error.code === 11000) {
      // console.log('B14: Lỗi duplicate key');
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field === 'username' ? 'Tên người dùng' : 'Email'} đã tồn tại` });
    }

    res.status(500).json({ message: 'Lỗi lưu người dùng', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng điền tên người dùng và mật khẩu' });
  }

  try {
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET || 'my_very_secure_secret_key_1234567890',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: { username: user.username, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

app.use((req, res) => {
  console.log('Không tìm thấy route:', req.url);
  res.status(404).json({ message: 'Không tìm thấy route' });
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});