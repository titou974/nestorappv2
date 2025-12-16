const defaultConfigs = {
  swift_checkout_sdk: "https://js.sumup.com/swift-checkout/v1/sdk.js",
  payment_widget_sdk: "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js",
  api_url: "https://api.sumup.com",
  currency: "EUR",
};

export const configPublic = {
  swift_checkout_sdk:
    process.env.NEXT_PUBLIC_SUMUP_SWIFT_CHECKOUT_SDK ||
    defaultConfigs.swift_checkout_sdk,
  payment_widget_sdk:
    process.env.NEXT_PUBLIC_SUMUP_PAYMENT_WIDGET_SDK ||
    defaultConfigs.payment_widget_sdk,
  // To be able to generate this see:
  // see https://js.sumup.com/showroom
  merchant_public_key: process.env.NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY,
};

export const configPrivate = {
  api_url: process.env.SUMUP_API_URL || defaultConfigs.api_url,

  // Merchant Information
  // Check: https://me.sumup.com
  merchant_code: process.env.SUMUP_MERCHANT_CODE,
  merchant_email: process.env.SUMUP_MERCHANT_EMAIL,

  // SumUp Api Credentials
  // Check https://developer.sumup.com/protected/oauth-apps/
  client_id: process.env.SUMUP_API_CLIENT_ID,
  client_secret: process.env.SUMUP_API_CLIENT_SECRET,

  // Checkout creation details
  donation_amount: process.env.FIXED_AMOUNT_DONATION,
  currency: process.env.FIXED_AMOUNT_CURRENCY || defaultConfigs.currency,
};
