"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Iyzipay = _interopRequireDefault(require("Iyzipay"));
var Payments = _interopRequireWildcard(require("../services/iyzico/methods/payments"));
var PaymentsThreeDs = _interopRequireWildcard(require("../services/iyzico/methods/threeds-payments"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken");
var _default = router => {
  //Normal payment route
  router.post("/payment", verifyToken, async (req, res) => {
    const price = req.body.price;
    const basketId = req.body.basketId;
    const cardHolderName = req.body.paymentCard.cardHolderName;
    const cardNumber = req.body.paymentCard.cardNumber;
    const expireMonth = req.body.paymentCard.expireMonth;
    const expireYear = req.body.paymentCard.expireYear;
    const cvc = req.body.paymentCard.cvc;
    const id = req.body.buyer.id;
    const name = req.body.buyer.name;
    const email = req.body.buyer.email;
    const surname = req.body.buyer.surname;
    const gsmNumber = req.body.buyer.gsmNumber;
    const contactName = req.body.shippingAddress.contactName;
    const country = req.body.shippingAddress.country;
    const city = req.body.shippingAddress.city;
    const address = req.body.shippingAddress.address;
    const zipCode = req.body.shippingAddress.zipCode;
    const cartProducts = req.body.products;
    const installment = req.body.installment;
    try {
      const response = await Payments.createPayment({
        locale: _Iyzipay.default.LOCALE.TR,
        //
        conversationId: (0, _nanoid.default)(),
        //
        price: price,
        //
        paidPrice: price,
        //
        currency: _Iyzipay.default.CURRENCY.TRY,
        //
        Installment: "3",
        //
        basketId: basketId,
        //
        paymentChannel: _Iyzipay.default.PAYMENT_CHANNEL.WEB,
        //
        paymentGroup: _Iyzipay.default.PAYMENT_GROUP.PRODUCT,
        //
        paymentCard: {
          cardHolderName: cardHolderName,
          //
          cardNumber: cardNumber,
          //
          expireMonth: expireMonth,
          //
          expireYear: expireYear,
          //
          cvc: cvc,
          //
          registerCard: "0"
        },
        buyer: {
          id: id,
          name: name,
          surname: surname,
          gsmNumber: gsmNumber,
          email: email,
          identityNumber: "0000000000000000000",
          lastLoginDate: "2020-10-05 12:43:45",
          registrationDate: "2020-10-04 12:43:45",
          registrationAddress: "Etiler Mahallesi 1450.sokak",
          ip: "85.34.78.112" /* Kullanıcının IP adresi */,
          city: city /* Kullanıcının şehri */,
          country: country /* Kullanıcının ülkesi */,
          zipCode: zipCode
        },
        shippingAddress: {
          contactName: contactName /* Teslimat için Kullanıcının Adı */,
          city: city /* Teslimat için Kullanıcının Şehri */,
          country: country /* Teslimat için Kullanıcının Ülkesi */,
          address: address /* Teslimat için Kullanıcının Şehri */,
          zipCode: zipCode /* Teslimat için Kullanıcının Posta Kodu */
        },

        billingAddress: {
          contactName: contactName /* Fatura için Kullanıcının Adı */,
          city: city /* Fatura için Kullanıcının Şehri */,
          country: country /* Fatura için Kullanıcının Ülkesi */,
          address: address /* Fatura için Kullanıcının Adresi */,
          zipCode: zipCode /* Fatura için Kullanıcının Posta Kodu */
        },

        basketItems: cartProducts.map((product, index) => {
          return {
            id: String(product?._id),
            name: product?.title,
            category1: product?.categories[0],
            itemType: _Iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
            price: product?.price * product?.cartQuantity
          };
        })
      });
      res.status(200).json(response);
    } catch (error) {
      console.log("error burada");
    }
  });

  //Complete 3d payment
  router.post("/payment/threeds/complete", async (req, res) => {
    try {
      const data = {
        locale: _Iyzipay.default.LOCALE.TR,
        conversationId: (0, _nanoid.default)(),
        paymentId: req.body.paymentId,
        conversationData: req.body.conversationData
      };
      const result = await PaymentsThreeDs.completePayment(data);
      res.status(200).json("Ödeme başarıyla tamamlandı...");
    } catch (error) {
      res.status(503).json("Ödeme işlemi başarısız oldu...");
    }
  });

  //Initialize 3d payment
  router.post("/payment/threeds", verifyToken, async (req, res) => {
    const price = req.body.price;
    const basketId = req.body.basketId;
    const cardHolderName = req.body.paymentCard.cardHolderName;
    const cardNumber = req.body.paymentCard.cardNumber;
    const expireMonth = req.body.paymentCard.expireMonth;
    const expireYear = req.body.paymentCard.expireYear;
    const cvc = req.body.paymentCard.cvc;
    const id = req.body.buyer.id;
    const name = req.body.buyer.name;
    const email = req.body.buyer.email;
    const surname = req.body.buyer.surname;
    const gsmNumber = req.body.buyer.gsmNumber;
    const contactName = req.body.shippingAddress.contactName;
    const country = req.body.shippingAddress.country;
    const city = req.body.shippingAddress.city;
    const address = req.body.shippingAddress.address;
    const zipCode = req.body.shippingAddress.zipCode;
    const cartProducts = req.body.products;
    try {
      const response = await PaymentsThreeDs.initializePayment({
        locale: _Iyzipay.default.LOCALE.TR,
        //
        conversationId: (0, _nanoid.default)(),
        //
        price: price,
        //
        paidPrice: price,
        //
        currency: _Iyzipay.default.CURRENCY.TRY,
        //
        Installment: "3",
        //
        basketId: basketId,
        //
        paymentChannel: _Iyzipay.default.PAYMENT_CHANNEL.WEB,
        //
        paymentGroup: _Iyzipay.default.PAYMENT_GROUP.PRODUCT,
        //
        callbackUrl: `${process.env.END_POINT}/payment/threeds/complete`,
        paymentCard: {
          cardHolderName: cardHolderName,
          //
          cardNumber: cardNumber,
          //
          expireMonth: expireMonth,
          //
          expireYear: expireYear,
          //
          cvc: cvc,
          //
          registerCard: "0"
        },
        buyer: {
          id: id,
          name: name,
          surname: surname,
          gsmNumber: gsmNumber,
          email: email,
          identityNumber: "0000000000000000000",
          lastLoginDate: "2020-10-05 12:43:45",
          registrationDate: "2020-10-04 12:43:45",
          registrationAddress: "Etiler Mahallesi 1450.sokak",
          ip: "85.34.78.112" /* Kullanıcının IP adresi */,
          city: city /* Kullanıcının şehri */,
          country: country /* Kullanıcının ülkesi */,
          zipCode: zipCode
        },
        shippingAddress: {
          contactName: contactName /* Teslimat için Kullanıcının Adı */,
          city: city /* Teslimat için Kullanıcının Şehri */,
          country: country /* Teslimat için Kullanıcının Ülkesi */,
          address: address /* Teslimat için Kullanıcının Şehri */,
          zipCode: zipCode /* Teslimat için Kullanıcının Posta Kodu */
        },

        billingAddress: {
          contactName: contactName /* Fatura için Kullanıcının Adı */,
          city: city /* Fatura için Kullanıcının Şehri */,
          country: country /* Fatura için Kullanıcının Ülkesi */,
          address: address /* Fatura için Kullanıcının Adresi */,
          zipCode: zipCode /* Fatura için Kullanıcının Posta Kodu */
        },

        basketItems: cartProducts.map((product, index) => {
          return {
            id: String(product?._id),
            name: product?.name,
            category1: product?.categories[0],
            itemType: _Iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
            price: product?.price * product?.cartQuantity
          };
        })
      });
      const html = Buffer.from(response?.threeDSHtmlContent, "base64").toString();
      res.send(html);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
exports.default = _default;