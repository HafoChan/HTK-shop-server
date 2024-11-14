import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

class BrainTree {
  generateToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.json(err);
      }
      return res.json(response);
    });
  }

  paymentProcess(req, res) {
    let { amountTotal, paymentMethod } = req.body;
    gateway.transaction.sale(
      {
        amount: amountTotal,
        paymentMethodNonce: paymentMethod,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.json(err);
        }

        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          return res.json(result);
        } else {
          console.error(result.message);
        }
      }
    );
  }
}

const brainTreeController = new BrainTree();
export default brainTreeController;
