import axios from "axios";
import http from "./httpService";

const apiEndpoint = (import.meta.env.VITE_API_ENDPOINT as string) + "/items";
const tokenKey = import.meta.env.VITE_TOKEN_KEY || "";

type CreateItemDataProps = {
  name: string;
  vendorName: string;
  description: string;
  photo: string;
  price: number;
  quantity: number;
};

async function getItems() {
  const data = await http.get(`${apiEndpoint}`);
  return data.data.data;
}
async function getItem(id: string) {
  const data = await http.get(`${apiEndpoint}/${id}`);
  return data.data.data;
}

async function createItems(itemsData: CreateItemDataProps) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Login to access this page");
  }
  const headers = new axios.AxiosHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const data = await http.post(`${apiEndpoint}`, itemsData, { headers });

  return data.data;
}

async function updateItems(id: string, itemsData: CreateItemDataProps) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Login to access this page");
  }
  const headers = new axios.AxiosHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const data = await http.patch(`${apiEndpoint}/${id}`, itemsData, { headers });

  return data.data;
}

async function deleteItems(id: string) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Login to access this page");
  }
  const headers = new axios.AxiosHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const data = await http.delete(`${apiEndpoint}/${id}`, { headers });

  return data.data;
}

export default {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
};
