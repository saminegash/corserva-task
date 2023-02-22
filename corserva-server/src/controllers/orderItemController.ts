import { Request, Response } from 'express';
import Helper from '../utils/helper';
import OrderItem from '../db/models/orderItem';

const CreateOrderItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { orderId, itemId, totalPrice, quantity } = req.body;

    const orderItem = await OrderItem.create({
      orderId,
      itemId,

      totalPrice,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, 'Created', null, orderItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetOrderListItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const orderItems = await OrderItem.findAll();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'OK', null, orderItems));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetOrderItemDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { orderId, itemId } = req.params;

    const orderItem = await OrderItem.findOne({
      where: {
        orderId,
        itemId
      }
    });

    if (!orderItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'OK', null, orderItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UpdateOrderItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { orderId, itemId } = req.params;
    const { totalPrice, quantity, createdAt, updatedAt } = req.body;

    const orderItem = await OrderItem.findOne({
      where: {
        orderId,
        itemId
      }
    });

    if (!orderItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    orderItem.orderId = orderId;
    orderItem.itemId = itemId;
    orderItem.totalPrice = totalPrice;
    orderItem.quantity = quantity;

    await orderItem.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Updated', null, orderItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const Delete = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId, itemId } = req.params;

    const orderItem = await OrderItem.findOne({
      where: {
        orderId,
        itemId
      }
    });

    if (!orderItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    const deletedItem = await orderItem.destroy();
    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Removed', null, deletedItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

export default {
  CreateOrderItem,
  UpdateOrderItem,
  GetOrderListItem,
  GetOrderItemDetail,
  Delete
};
