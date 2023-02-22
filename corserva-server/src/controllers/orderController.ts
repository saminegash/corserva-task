import { Request, Response } from 'express';
import Item from '../db/models/item';
import Helper from '../utils/helper';
import Order from '../db/models/order';

const CreateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, status, address, totalPrice, quantity } = req.body;

    const order = await Order.create({
      userId,
      status,
      address,
      totalPrice,
      quantity
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, 'Created', null, order));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetOrderList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.findAll();

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, orders));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetOrderDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, order));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UpdateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userId, status, address, totalPrice, quantity } = req.body;

    const order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    order.userId = userId;
    order.status = status;
    order.address = address;
    order.totalPrice = totalPrice;
    order.quantity = quantity;

    await order.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Updated', null, order));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const Cancel = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    const deletedItem = await order.destroy();
    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Removed', null, deletedItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

export default {
  CreateOrder,
  UpdateOrder,
  GetOrderList,
  GetOrderDetail,
  Cancel
};
