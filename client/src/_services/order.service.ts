import {authHeader} from "@/_helpers/auth-header";
import {handleResponse} from "@/_helpers/handle-response";
import {FetchedOrder, OrderProps} from "@/_objects/Order";
import {FetchedProduct} from "@/_objects/Product";

class OrderService {

  async createOrder(values: OrderProps, userId: number): Promise<FetchedOrder | void> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {...authHeader()},
      body: JSON.stringify(values)
    };
    return await handleResponse(await fetch(`/api/order/create/user/${userId}`, requestOptions));
  };

}

export const orderService = new OrderService();