const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const categoryRoute = require('./category.route');
const itemRoute = require('./item.route');
const orderRoutes = require('./order.route');
const balanceRoutes = require('./balance.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/items',
    route: itemRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },

  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/balance',
    route: balanceRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
