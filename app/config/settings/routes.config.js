/**
 * API Routes and corresponding actions
 */
module.exports = [
  {
    route: '/v1/user/',
    method: 'GET',
    controller: '../controllers/v1/UserController.js',
    action: 'index'
  },
  {
    route: '/v1/user/:id',
    method: 'PUT',
    controller: '../controllers/v1/UserController.js',
    action: 'update'
  },
  {
    route: '/v1/signin/',
    method: 'POST',
    controller: '../controllers/v1/AuthController.js',
    action: 'signin'
  }
];
