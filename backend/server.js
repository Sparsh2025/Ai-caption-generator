require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

const startServer = async () => {
  try {
     connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
