import {authHeader} from "@/_helpers/auth-header";
import {handleResponse} from "@/_helpers/handle-response";
import {FetchedProduct, ProductProps} from "@/_objects/Product";

class ProductService {

  async addProduct(values: ProductProps): Promise<FetchedProduct | void | (FetchedProduct | void)[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { ...authHeader() },
      body: JSON.stringify(values)
    };
    return await handleResponse(await fetch(`/api/product/create`, requestOptions));
  };

  async updateById(productId: number, values: ProductProps): Promise<FetchedProduct | void | (FetchedProduct | void)[]> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { ...authHeader() },
      body: JSON.stringify(values)
    };
    return await handleResponse(await fetch(`/api/product/${productId}`, requestOptions));
  }


  async deleteById(productId: number): Promise<FetchedProduct | void | (FetchedProduct | void)[]> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: { ...authHeader() }
    };
    return await handleResponse(await fetch(`/api/product/${productId}`, requestOptions));
  };

  async getById(productId: number): Promise<FetchedProduct | void | (FetchedProduct | void)[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { ...authHeader() }
    };
    return await handleResponse(await fetch(`/api/product/${productId}`, requestOptions));
  };

  async getProducts():Promise<FetchedProduct | void | (FetchedProduct | void)[]> {
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