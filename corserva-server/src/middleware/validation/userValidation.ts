import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import Helpers from '../../utils/helper';
import User from '../../db/models/user';

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, roleId, confirmPassword } = req.body;

    const data = {
      name,
      email,
      roleId,
      password,
      confirmPassword
    };

    const rules = Joi.object({
      name: Joi.string().required(),
      roleId: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref('password')
    });

    const validate = await rules.validateAsync(data);

    const user = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (user) {
      const errorData = {
        errors: {
          email: ['Email already used']
        }
      };
      return res
        .status(400)
        .send(Helpers.ResponseData(400, 'BadRequest', errorData, null));
    }
    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};
const LoginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const data = {
      email,
      password
    };

    const rules = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const validate = await rules.validateAsync(data);

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

export default { RegisterValidation, LoginValidation };
