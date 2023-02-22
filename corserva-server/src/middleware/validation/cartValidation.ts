import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import Helpers from '../../utils/helper';

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const data = {
      userId
    };

    const rules = Joi.object({
      userId: Joi.string().required()
    });

    const validate = await rules.validateAsync(data);

    if (validate) {
      return res
        .status(400)
        .send(Helpers.ResponseData(400, 'Bad Request', validate.errors, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helpers.ResponseData(500, '', error, null));
  }
};

export default {
  Create
};
