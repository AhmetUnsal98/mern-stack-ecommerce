"use strict";

var Cards = _interopRequireWildcard(require("./methods/cards"));
var Installments = _interopRequireWildcard(require("./methods/installments"));
var Payments = _interopRequireWildcard(require("./methods/payments"));
var PaymentThreeDs = _interopRequireWildcard(require("./methods/threeds-payments"));
var Checkouts = _interopRequireWildcard(require("./methods/checkout"));
var CancelPayments = _interopRequireWildcard(require("./methods/cancel-payments"));
var RefundPayments = _interopRequireWildcard(require("./methods/refund-payments"));
var _nanoid = _interopRequireDefault(require("../../utils/nanoid"));
var Logs = _interopRequireWildcard(require("../../utils/logs"));
var _iyzipay = _interopRequireDefault(require("./connection/iyzipay"));
var _iyzipay2 = _interopRequireDefault(require("iyzipay"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* ------------------------- */
/* a-) CARDS*/

//Bir kullanıcı ve kart oluştur.
const createUserAndCards = () => {
  Cards.createUserCard({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    //İyzipay ile iletişim kurarken kullanılan id
    email: "email@email.com",
    extarnalId: (0, _nanoid.default)(),
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030"
    }
  }).then(result => {
    Logs.logFile("1-cards-kullanıcı-oluştur", result);
  }).catch(err => {
    Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata", err);
  });
};
//createUserAndCards();
/*-------------------------------------------------*/
//Bir kullanıcıya yeni bir kart ekle cardUserKey ile
const createACartForAUser = () => {
  Cards.createUserCard({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    //İyzipay ile iletişim kurarken kullanılan id
    email: "email@email.com",
    extarnalId: (0, _nanoid.default)(),
    cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030"
    }
  }).then(result => {
    Logs.logFile("2-cards-bir-kullanıcıya-kart-ekle", result);
  }).catch(err => {
    Logs.logFile("2-cards-bir-kullanıcıya-kart-ekle-hata", err);
  });
};
//createACartForAUser();
/*---------------------------------------------------------------- */
//Bir kullanınınn kartlarını oku cardUserKeye göre buluyor.
const readCardOfAUser = () => {
  Cards.getUserCards({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    //İyzipay ile iletişim kurarken kullanılan id
    email: "email@email.com",
    cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo="
  }).then(result => {
    Logs.logFile("3-cards-bir-kullanıcıya-ait-kartları-oku", result);
  }).catch(err => {
    Logs.logFile("3-cards-bir-kullanıcıya-ait-kartları-oku-hata", err);
  });
};
//readCardOfAUser();
/*------------------------------------------------------------------------------------------------ */
//Bir kullanıcının bir kartını sil
const deleteCardOfAUser = () => {
  Cards.deleteUserCard({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    //İyzipay ile iletişim kurarken kullanılan id
    email: "email@email.com",
    cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
    cardToken: "J5x8UieWbNjvsIKu22+hd9eZXIs="
  }).then(result => {
    Logs.logFile("4-cards-bir-kullanıcıya-ait-kartı-sil", result);
  }).catch(err => {
    Logs.logFile("4-cards-bir-kullanıcıya-ait-kartı-sil-hata", err);
  });
};
//deleteCardOfAUser();
//readCardOfAUser();
/*----------------------------------------------------------------*/
/* ------------------------- */
/* b-) INSTALLMENTS*/
/* ------------------------- */
//Bir kart ile gerçekleşebilecek taksitlerin kontrolü
const checkInstallment = () => {
  Installments.checkInstallment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    binNumber: "552879",
    price: "1000"
  }).then(result => {
    Logs.logFile("5-bir-card-ile-kart-ve-ücret-taksit-kontrol", result);
  }).catch(err => {
    Logs.logFile("5-bir-card-ile-kart-ve-ücret-taksit-kontrol-hata", err);
  });
};
//checkInstallment();
/*------------------------------------------------------------------------------------------------ */
/* ------------------------- */
/* b-) NORMAL PAYMENTS*/
/* ------------------------- */

//Kayıtlı olmayan kart ile ödeme yap
const createPayment = () => {
  return Payments.createPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0"
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("6-yeni-bir-card-ile-ödeme-al-ve-kartı-kaydetme", result);
  }).catch(err => {
    Logs.logFile("6-yeni-bir-card-ile-ödeme-al-ve-kartı-kaydetme-hata", err);
  });
};
//createPayment();
/*------------------------------------------------------------------------------------------------*/
//Bir ödeme yap ve kartı kaydet cardUserKey ile
const createAPaymentAndSaveCard = () => {
  return Payments.createPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1"
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("7-yeni-bir-card-ile-ödeme-al-ve-kartı-kaydet", result);
  }).catch(err => {
    Logs.logFile("7-yeni-bir-card-ile-ödeme-al-ve-kartı-kaydet-hata", err);
  });
};
//createAPaymentAndSaveCard();
//readCardOfAUser();
/*---------------------------------------------------------------------------*/
//Kaydedilmiş bir kart ile ödeme yap cardToken ile
const createAPaymentWithSavedCard = () => {
  return Payments.createPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
      cardToken: "5/UWPpHKuU0i8VHInyOeXEvmi24="
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("8-yeni-bir-kayıtlı-card-ile-ödeme-al", result);
  }).catch(err => {
    Logs.logFile("8-yeni-bir-kayıtlı-card-ile-ödeme-al-hata", err);
  });
};
//createAPaymentWithSavedCard();

/* ---------------------------------    ----------------  --------- --------- --------- --------  --------*/
/* ------------------------- */
/* b-) 3D SECURE PAYMENTS*/
/* ------------------------- */

/* ---------------------------------    ----------------  --------- --------- --------- --------  --------*/
//Complete payment in threeds
const initializeThreeDSPayments = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0"
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("9-threeds-payments-yeni-bir-kart-ile-ödeme-al", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("9-threeds-payments-yeni-bir-kart-ile-ödeme-al-hata", err);
  });
};
//initializeThreeDSPayments();

/* ---------------------------------    ----------------  --------- --------- --------- --------  --------*/
//3DS tamammla
const completeThreedsPayments = () => {
  PaymentThreeDs.completePayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentId: "18109708",
    conversationData: "coversationdata"
  }).then(result => {
    Logs.logFile("10-threeds-payments-yeni-bir-kart-ile-ödeme-tamamla", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("10-threeds-payments-yeni-bir-kart-ile-ödeme-tamamla-hata", err);
  });
};
//completeThreedsPayments();

/* ---------------------------------    ----------------  --------- --------- --------- --------  --------*/
//Kayıtlı kart ile 3d başlatma
const initializeThreeDSPaymentsWithRegisteredCard = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
      cardToken: "5/UWPpHKuU0i8VHInyOeXEvmi24="
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("11-threeds-payments-kayıtlı-bir-kart-ile-ödeme-al", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("11-threeds-payments-kayıtlı-bir-kart-ile-ödeme-al-hata", err);
  });
};
//initializeThreeDSPaymentsWithRegisteredCard();

/* ---------------------------------    ----------------  --------- --------- --------- --------  --------*/
//3ds ödemesini başlat ve kartı kaydet
const initializeThreeDSPaymentsAndRegisterCard = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
      cardAlias: "Kredi Kartım 3DS",
      cardHolderName: "Jhon Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1"
    },
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("12-threeds-payments-bir-kart-ile-ödeme-al-kartı-kaydet", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("12-threeds-payments-bir-kart-ile-ödeme-al-kartı-kaydet-hata", err);
  });
};
//initializeThreeDSPaymentsAndRegisterCard();
//completeThreedsPayments();
/*------------------------------------------------------------ -------------- */
/* ------------------------- */
/* C-) CHECKOUT PAYMENTS*/
/* ------------------------- */

//Checkout form içersinde ödeme başlat
const initializeCheckoutForm = () => {
  Checkouts.initialize({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    price: "300",
    paidPrice: "300",
    currency: _iyzipay2.default.CURRENCY.TRY,
    Installment: "1",
    basketId: "B67JDL",
    paymentChannel: _iyzipay2.default.PAYMENT_CHANNEL.WEB,
    paymentGroup: _iyzipay2.default.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/checkout/complete/payment",
    cardUserKey: "iQOr+u8kH6ydLbmbDH+A6ROeauo=",
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: "B67JDLSDS",
      name: "Jhon",
      surname: "Doe",
      gsmNumber: "+905077838192",
      email: "email@gmail.com",
      identityNumber: "0000000000000000000",
      lastLoginDate: "2020-10-05 12:43:45",
      registrationDate: "2020-10-04 12:43:45",
      registrationAddress: "Etiler Mahallesi 1450.sokak",
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732"
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },

    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },

    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "150" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "100"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay2.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "50"
    }]
  }).then(result => {
    Logs.logFile("13-checkout-form-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("13-checkout-form-payments-hata", err);
  });
};
//initializeCheckoutForm();
/*-------------------------------------------------------------*/
const getFormPayment = () => {
  Checkouts.getFormPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    token: "a554d48b-025a-46c8-acaa-564fa4d669a7"
  }).then(result => {
    Logs.logFile("14-checkout-form-payments-get-details", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("14-checkout-form-payments-get-details-hata", err);
  });
};
//getFormPayment();
/*------------------------------------------------------------------------------------------------*/
/* ------------------------- */
/* d-) CANCEL PAYMENTS*/
/* ------------------------- */
//Ödemeyi iptal etme testi
const cancelPayments = () => {
  CancelPayments.cancelPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentId: "18110130",
    ip: "85.34.78.112"
  }).then(result => {
    Logs.logFile("15-cancel-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("15-cancel-payments-hata", err);
  });
};
//cancelPayments();
//Ödeme iptal with reason
const cancelPaymentsWithReason = () => {
  CancelPayments.cancelPayment({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentId: "18110130",
    ip: "85.34.78.112",
    reason: _iyzipay2.default.REFUND_REASON.BUYER_REQUEST,
    description: "Kullanıcı isteğiyle iptal"
  }).then(result => {
    Logs.logFile("16-cancel-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("16-cancel-payments-hata", err);
  });
};
/****************************************************************************** */
/* ------------------------- */
/* e-) REFUND PAYMENTS*/
/* --------------------------*/

//Ödemenin belirli bir parçasını iade et
const refundPayment = () => {
  RefundPayments.refundPayments({
    locale: _iyzipay2.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    paymentTransactionId: "19320560",
    price: "10",
    currency: _iyzipay2.default.CURRENCY.TRY,
    ip: "85.34.78.112"
  }).then(result => {
    Logs.logFile("17-refund-payments", result);
  }).catch(err => {
    console.log(err);
    Logs.logFile("17-refund-payments-hata", err);
  });
};
//refundPayment();