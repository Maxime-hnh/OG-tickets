import {authHeader} from "@/_helpers/auth-header";
import {handleResponse} from "@/_helpers/handle-response";
import {FetchedOrder, OrderProps} from "@/_objects/Order";

class OrderService {

  async createOrder(values: OrderProps, userId: number): Promise<FetchedOrder | void> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {...authHeader()},
      body: JSON.stringify(values)
    };
    return await handleResponse(await fetch(`/api/order/create/user/${userId}`, requestOptions));
  };

  async validateOrder(orderId: number, userId: number): Promise<FetchedOrder | void> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {...authHeader()},
    };
    return await handleResponse(await fetch(`/api/order/validate/${orderId}/user/${userId}`, requestOptions));
  };

  async getQrCode(orderId: number): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {...authHeader()},
    };
    const response = await fetch(`/api/order/qrcode/${orderId}`, requestOptions);
    if (!response.ok) throw new Error('Erreur lors de la récupération du QR code');
    return await response.blob();
  };

  async getAll(): Promise<FetchedOrder[] | void> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {...authHeader()},
    };
    return await handleResponse(await fetch(`/api/order/allWithUser`, requestOptions));
  };

  async scanQrCode(values: any): Promise<Response> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {...authHeader()},
      body: JSON.stringify(values)
    };
    const response = await fetch(`/api/qrcode/scan`, requestOptions);
    return response;
  };

}

export const orderService = new OrderService();