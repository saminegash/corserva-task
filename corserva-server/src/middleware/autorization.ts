import { Request, Response, NextFunction } from 'express';
import Helper from '../utils/helper';

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers.authorization;
    const token = authToken && authToken.split(' ')[1];

    if (token === null) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unautorized', null, null));
    }
    const result = Helper.ExtractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unautorized', null, null));
    }

    res.locals.userEmail = result?.email;
    res.locals.roleId = result?.roleId;
    next();
  } catch (err: any) {
    return res.status(500).send(Helper.ResponseData(500, '', err, null));
  }
};

const SuperUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== '76be8b23-50b5-4f3a-8d28-9f736a47c4e6') {
      return res
        .status(401)
        .send(Helper.ResponseData(403, 'Forbidden', null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.ResponseData(500, '', err, null));
  }
};

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== '521fae64-df67-4caf-b812-c85021e114fa') {
      return res
        .status(401)
        .send(Helper.ResponseData(403, 'Forbidden', null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.ResponseData(500, '', err, null));
  }
};

const BasicUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== '58582b39-1e49-4e3e-aedf-1ebd7239cc9a') {
      return res
        .status(401)
        .send(Helper.ResponseData(403, 'Forbidden', null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.ResponseData(500, '', err, null));
  }
};

export default { Authenticated, SuperUser, AdminRole, BasicUser };
