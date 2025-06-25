const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();
dotenv.config();
connectDB();


// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api', submissionRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.BASE_URL || 5000}`);
});

app.get('/', (req, res) => {
  res.render('index.html');
});

// app.get('/api', authMiddleware, (req, res) => {
//   res.json({
//     message: 'This is a protected route',
//     user: req.user, // User information from authMiddleware
//   });
// });