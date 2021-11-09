const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IAtT6AdjKP6VXbYSU8bT4LpQyrKkTlddovsk3iwkpGX8VS8t3ymqzeBAyafKhgDyuW13Ynm50sYGzlepZYjNy3X009TsYVAeJ');
const stripeCustomerId = 'cus_IqB42RHeVD1qnL';

router.post('/', async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if (!customer) {
      res.status(404).json({
        status: false,
        message: 'Customer not found',
        data: null
      });
    }

    const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

    /*const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      customer: stripeCustomerId,
      payment_method: defaultPaymentMethodId,
      off_session: true,
      confirm: true,
    });*/

    res.json({
      status: true,
      message: "Payment Intent Created Successfully",
      data: defaultPaymentMethodId
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