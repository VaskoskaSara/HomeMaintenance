import { apiJson, apiPost } from "../axiosInstance";

export const  postFormFetcher = async(url: string, { arg }: { arg: any }) => {
   await apiPost.post(url,{data: arg});
};

export const postJsonFetcher = async <T>(url: string, { arg }: { arg: any }): Promise<T> => {
   const response = await apiJson.post<T>(url, { data: arg });
   return response.data; // Return the data of type T
};


