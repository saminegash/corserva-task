import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Role from '../db/models/role';
import User from '../db/models/user';

import Helper from '../utils/helper';
import PasswordHelper from '../utils/passwordHash';

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword, roleId } = req.body;

    const hashed = await PasswordHelper.PasswordHashing(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      roleId
    });
    const accessToken = Helper.GenerateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId
    });

    const resData = {
      user,
      accessToken
    };

    return res
      .status(201)
      .send(Helper.ResponseData(201, 'Created', null, resData));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unauthorized', null, null));
    }

    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );
    if (!matched) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unauthorized', null, null));
    }

    const dataUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId
    };
    const accessToken = Helper.GenerateToken(dataUser);
    const refreshToken = Helper.GenerateRefreshToken(dataUser);

    await user.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    const responseData = {
      accessToken,
      refreshToken,
      user: dataUser
    };

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'OK', null, responseData));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unauthorized', null, null));
    }

    const decodedUser = Helper.ExtractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, 'Unauthorized', null, null));
    }

    const resultUser = {
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId
    };
    const responseData = {
      accessToken: req.cookies?.accessToken,
      refreshToken,
      user: resultUser
    };

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'OK', null, responseData));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UserDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email
      },
      include: {
        model: Role,
        attributes: ['id', 'roleName']
      }
    });

    if (!user) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'User not found', null, null));
    }

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, user));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(200)
        .send(Helper.ResponseData(200, 'User logout', null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      res.clearCookie('refreshToken');
      return res
        .status(200)
        .send(Helper.ResponseData(200, 'User logout', null, null));
    }

    res.clearCookie('refreshToken');
    return res
      .status(200)
      .send(Helper.ResponseData(200, 'User logout', null, null));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

export default { Register, UserLogin, RefreshToken, UserDetail, UserLogout };
