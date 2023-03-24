"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Iyzipay = _interopRequireDefault(require("Iyzipay"));

var _moment = _interopRequireDefault(require("moment"));

var _carts = _interopRequireDefault(require("../db/carts"));

var _users = _interopRequireDefault(require("../db/users"));

var _Session = _interopRequireDefault(require("../middlewares/Session"));

var Payments = _interopRequireWildcard(require("../services/iyzico/methods/payments"));

var _nanoid = _interopRequireDefault(require("../utils/nanoid"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = router => {
  router.post("/checkout", _Session.default, async (req, res) => {
    const products = req.body.products;
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

    try {
      const response = await Payments.createPayment({
        locale: _Iyzipay.default.LOCALE.TR,
        conversationId: (0, _nanoid.default)(),
        price: price,
        paidPrice: price,
        currency: _Iyzipay.default.CURRENCY.TRY,
        Installment: "1",
        basketId: basketId,
        paymentChannel: _Iyzipay.default.PAYMENT_CHANNEL.WEB,
        paymentGroup: _Iyzipay.default.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
          cardHolderName: cardHolderName,
          cardNumber: cardNumber,
          expireMonth: expireMonth,
          expireYear: expireYear,
          cvc: cvc,
          registerCard: "0"
        },
        buyer: {
          id: "B67JDLSDS",
          name: name,
          surname: surname,
          gsmNumber: gsmNumber,
          email: email,
          identityNumber: "0000000000000000000",
          lastLoginDate: "2020-10-05 12:43:45",
          registrationDate: "2020-10-04 12:43:45",
          registrationAddress: "Etiler Mahallesi 1450.sokak",
          ip: "85.34.78.112"
          /* Kullanıcının IP adresi */
          ,
          city: city
          /* Kullanıcının şehri */
          ,
          country: country
          /* Kullanıcının ülkesi */
          ,
          zipCode: zipCode
        },
        shippingAddress: {
          contactName: contactName
          /* Teslimat için Kullanıcının Adı */
          ,
          city: city
          /* Teslimat için Kullanıcının Şehri */
          ,
          country: country
          /* Teslimat için Kullanıcının Ülkesi */
          ,
          address: address
          /* Teslimat için Kullanıcının Şehri */
          ,
          zipCode: zipCode
          /* Teslimat için Kullanıcının Posta Kodu */

        },
        billingAddress: {
          contactName: contactName
          /* Fatura için Kullanıcının Adı */
          ,
          city: city
          /* Fatura için Kullanıcının Şehri */
          ,
          country: country
          /* Fatura için Kullanıcının Ülkesi */
          ,
          address: address
          /* Fatura için Kullanıcının Adresi */
          ,
          zipCode: zipCode
          /* Fatura için Kullanıcının Posta Kodu */

        },
        basketItems: [{
          id: "BI103",
          name: "Usb",
          category1: "Electronics",
          category2: "Usb / Cable",
          itemType: _Iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
          price: "10000"
        }]
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};

exports.default = _default;