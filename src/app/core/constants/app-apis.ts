export const APP_APIS = {
  auth: {
    signin: 'v1/auth/signin',
    signup: 'v1/auth/signup/',
    forgotPasswords: 'v1/auth/forgotPasswords/',
    verifyResetCode: 'v1/auth/verifyResetCode/',
    changeMyPassword: 'v1/users/changeMyPassword/',
    resetPassword: 'v1/auth/resetPassword/',
    updateMe: 'v1/users/updateMe/',
    users: 'v1/users/',
    verifyToken: 'v1/auth/verifyToken/',
  },
  brands: 'v1/brands/',
  products: 'v1/products/',
  categories: 'v1/categories/',
  subCategories: 'v1/subcategories/',
  cart: {
    cart_v1: 'v1/cart/',
    cart_v2: 'v2/cart/',
    applyCoupon_v2: 'v2/cart/applyCoupon',
  },
  wishlist: 'v1/wishlist/',
  reviews: 'v1/reviews/',
  orders: {
    base_v1: 'v1/orders/',
    createCash_v2: 'v2/orders/',
    checkoutSession: 'v1/orders/checkout-session/',
  },
  user: {
    addresses: 'v1/addresses/',
  },
};
