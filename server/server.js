const express = require('express');
const cors =require('cors');

require('dotenv').config();

const connectDB = require('./db');
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const routes = require('./routes/routes');
app.use('/api', routes);




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}
);