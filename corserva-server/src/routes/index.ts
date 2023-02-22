import express from 'express';

import RoleController from '../controllers/roleController';
import UserController from '../controllers/userController';

import UserValidation from '../middleware/validation/userValidation';
import Authorization from '../middleware/autorization';
import itemValidation from '../middleware/validation/itemValidation';
import itemController from '../controllers/itemController';
import orderValidation from '../middleware/validation/orderValidation';
import orderController from '../controllers/orderController';
import orderItemController from '../controllers/orderItemController';
import cartItemController from '../controllers/cartItemController';

const router = express.Router();

// admin functionality
router.get('/roles', Authorization.Authenticated, RoleController.GetRole);
router.post(
  '/roles',
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleController.CreateRole
);
router.post(
  '/roles/:id',
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleController.UpdateRole
);
router.delete(
  '/roles/:id',
  Authorization.Authenticated,
  Authorization.SuperUser,
  RoleController.DeleteRole
);
router.get(
  '/roles/:id',
  Authorization.Authenticated,
  RoleController.GetRoleById
);

// User Routing
router.post(
  '/users/signup',
  UserValidation.RegisterValidation,
  UserController.Register
);
router.post(
  '/users/login',
  UserValidation.LoginValidation,
  UserController.UserLogin
);
router.get('/users/refresh-token', UserController.RefreshToken);
router.get(
  '/users/current-user',
  Authorization.Authenticated,
  UserController.UserDetail
);
router.get(
  '/users/logout',
  Authorization.Authenticated,
  UserController.UserLogout
);

// Item Routing
router.post(
  '/items',
  itemValidation.CreateItemValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  itemController.CreateItem
);
router.get('/items', itemController.GetItemList);

router.get('/items/:id', itemController.GetDetailItem);
router.patch(
  '/items/:id',
  itemValidation.CreateItemValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  itemController.UpdateItem
);

router.delete(
  '/items/:id',
  Authorization.Authenticated,
  Authorization.SuperUser,
  itemController.Delete
);

// Order routing
router.post(
  '/orders',
  orderValidation.CreateOrderValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  orderController.CreateOrder
);
router.get(
  '/orders',
  Authorization.Authenticated,
  Authorization.AdminRole,
  orderController.GetOrderList
);

router.get(
  '/orders/:id',
  Authorization.Authenticated,
  Authorization.AdminRole,
  orderController.GetOrderDetail
);
router.patch(
  '/orders/:id',
  orderValidation.CreateOrderValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  orderController.UpdateOrder
);
router.delete(
  '/orders/:id',
  Authorization.Authenticated,
  Authorization.AdminRole,
  orderController.Cancel
);

export default router;
