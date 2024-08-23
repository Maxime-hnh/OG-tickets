import toast from "react-hot-toast";

export async function handleResponse<TData = any>(response: Response): Promise<{ data: TData[] } | TData[] | TData> {
  const text: string = await response.text();
  let data = text && JSON.parse(text);

  if (!response.ok) {
    if ([401].indexOf(response.status) !== -1) {
      console.log("error 401 " + response.statusText, response);
    }
    if ([403].indexOf(response.status) !== -1) {
      console.log("error 403 " + response.statusText, response);
    }
    if ([500].indexOf(response.status) !== -1) {
      console.log("error 500 " + response.statusText, response);
      toast.error((data && data.message) || response.statusText, {
        duration: 3000,
        position:"bottom-center"
      });
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
