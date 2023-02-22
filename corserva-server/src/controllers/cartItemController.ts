import { Request, Response } from 'express';
import Helper from '../utils/helper';
import CartItem from '../db/models/cartItem';

const CreateCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cartId, itemId, totalPrice, quantity } = req.body;

    const orderItem = await CartItem.create({
      cartId,
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

const GetCartListItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cartItems = await CartItem.findAll();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'OK', null, cartItems));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetCartItemDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cartId, itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: {
        cartId,
        itemId
      }
    });

    if (!cartItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, cartItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UpdateCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cartId, itemId } = req.params;
    const { totalPrice, quantity, createdAt, updatedAt } = req.body;

    const cartItem = await CartItem.findOne({
      where: {
        cartId,
        itemId
      }
    });

    if (!cartItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    cartItem.cartId = cartId;
    cartItem.itemId = itemId;
    cartItem.totalPrice = totalPrice;
    cartItem.quantity = quantity;

    await cartItem.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Updated', null, cartItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const Delete = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cartId, itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: {
        cartId,
        itemId
      }
    });

    if (!cartItem) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    const deletedItem = await cartItem.destroy();
    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Removed', null, deletedItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

export default {
  CreateCartItem,
  UpdateCartItem,
  GetCartListItem,
  GetCartItemDetail,
  Delete
};
