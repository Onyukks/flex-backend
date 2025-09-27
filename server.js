require('dotenv').config();
const express = require('express');
const cors = require('cors')
const reviewsRouter = require('./routes/reviews');  
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use('/api/reviews', reviewsRouter);  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
