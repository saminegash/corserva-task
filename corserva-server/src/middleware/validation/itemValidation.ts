import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import Helpers from '../../utils/helper';
import Item from '../../db/models/item';
import Cart from '../../db/models/cart';

const CreateItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, vendorName, price, quantity } = req.body;
    const data = {
      name,
      vendorName,
      price,
      quantity
    };

    const rules = Joi.object({
      name: Joi.string().required(),
      vendorName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required()
    });

    const validate = await rules.validateAsync(data);

    // if (validate) {
    //   return res
    //     .status(400)
    //     .send(Helpers.ResponseData(400, 'Bad Request', validate.errors, null));
    // }

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

const CreateOrderItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, itemId, totalPrice, quantity } = req.body;
    const data = {
      orderId,
      itemId,
      totalPrice,
      quantity
    };

    const rules = Joi.object({
      orderId: Joi.string().required(),
      itemId: Joi.string().required(),
      totalPrice: Joi.number().required(),
      quantity: Joi.number().required()
    });

    const validate = await rules.validateAsync(data);

    const item = await Item.findOne({
      where: {
        id: itemId
      }
    });

    if (!item) {
      const errorData = {
        errors: {
          itemId: ['Item not found']
        }
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, 'Bad Request', errorData, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

const CreateCartItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId, itemId, totalPrice, quantity } = req.body;
    const data = {
      cartId,
      itemId,
      totalPrice,
      quantity
    };

    const rules = Joi.object({
      cartId: Joi.string().required(),
      itemId: Joi.string().required(),
      totalPrice: Joi.number().required(),
      quantity: Joi.number().required()
    });

    const validate = await rules.validateAsync(data);

    const item = await Item.findOne({
      where: {
        id: itemId
      }
    });
    if (!item) {
      const errorData = {
        errors: {
          itemId: ['Item not found']
        }
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, 'Bad Request', errorData, null));
    }

    const cart = await Cart.findOne({
      where: {
        id: cartId
      }
    });

    if (!cart) {
      const errorData = {
        errors: {
          cartId: ['Cart not found']
        }
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, 'Bad Request', errorData, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

export default {
  CreateItemValidation,
  CreateOrderItemValidation,
  CreateCartItemValidation
};
