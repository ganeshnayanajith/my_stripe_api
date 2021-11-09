const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IAtT6AdjKP6VXbYSU8bT4LpQyrKkTlddovsk3iwkpGX8VS8t3ymqzeBAyafKhgDyuW13Ynm50sYGzlepZYjNy3X009TsYVAeJ');
const stripeCustomerId = 'cus_IqB42RHeVD1qnL';

router.post('/card', async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: req.body.token
      },
    });

    if (!paymentMethod) {
      res.status(500).json({
        status: false,
        message: 'Cannot create a payment method',
        data: null
      });
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: 'card',
    });

    if (paymentMethods.data.find(item => item.card.fingerprint === paymentMethod.card.fingerprint)) {
      res.status(500).json({
        status: false,
        message: 'Payment method already exist',
        data: null
      });
    }

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: stripeCustomerId,
    });

    res.json({
      status: true,
      message: "Payment Method Created Successfully",
      data: paymentMethod
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: null
    });
  }
});

module.exports = router;