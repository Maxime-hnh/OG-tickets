import {authHeader} from "@/_helpers/auth-header";
import {handleResponse} from "@/_helpers/handle-response";

class ProductService {

  async getProducts():Promise<any | void> {
    const requestOptions:RequestInit  = {
      method: "GET",
      headers : {
        ...authHeader()
      }
    }
    return await handleResponse(await fetch(`/api/product/all`, requestOptions));
  }
}

export const productService = new ProductService();