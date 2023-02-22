import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import Helpers from '../../utils/helper';

const CreateOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, userId, totalPrice, quantity, address } = req.body;
    const data = {
      status,
      userId,
      totalPrice,
      quantity,
      address
    };

    const rules = Joi.object({
      status: Joi.string().required(),
      userId: Joi.string().required(),
      totalPrice: Joi.number().required(),
      quantity: Joi.number().required(),
      address: Joi.string().required()
    });

    const validate = await rules.validateAsync(data);

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

export default {
  CreateOrderValidation
};
