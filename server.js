const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const paymentIntentRoutes = require('./routes/paymentIntents');
const paymentMethodRoutes = require('./routes/paymentMethods');

app.use('/api/paymentintent', paymentIntentRoutes);
app.use('/api/paymentmethod', paymentMethodRoutes);

app.get("/api", (req, res) => {
  res.json({
    status: true,
    message: "Stripe API Response",
    data: {}
  });
});

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is listening on port 3000");
  }
});