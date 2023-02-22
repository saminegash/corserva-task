import { Request, Response } from 'express';
import Item from '../db/models/item';
import Helper from '../utils/helper';

const CreateItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, vendorName, description, photo, price, quantity } = req.body;

    const item = await Item.create({
      name,
      vendorName,
      description,
      photo,
      price,
      quantity
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, 'Created', null, item));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetItemList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const items = await Item.findAll();

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, items));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const GetDetailItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    return res.status(200).send(Helper.ResponseData(200, 'OK', null, item));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const UpdateItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, vendorName, description, photo, price, quantity } = req.body;

    const item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    item.name = name;
    item.vendorName = vendorName;
    item.description = description;
    item.photo = photo;
    item.price = price;
    item.quantity = quantity;

    await item.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Updated', null, item));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

const Delete = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, 'NotFound', null, null));
    }

    const deletedItem = await item.destroy();
    return res
      .status(200)
      .send(Helper.ResponseData(200, 'Removed', null, deletedItem));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, '', error, null));
  }
};

export default {
  CreateItem,
  UpdateItem,
  GetItemList,
  GetDetailItem,
  Delete
};
