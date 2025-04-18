const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const servicesRouter = require('./routes/services');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', servicesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
