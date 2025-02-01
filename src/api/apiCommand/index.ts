import { apiJson, apiPost } from "../axiosInstance";

export const  postFormFetcher = async(url: string, { arg }: { arg: any }) => {
   const response =await apiPost.post(url,{data: arg});
   return response.data;
};

export const postJsonFetcher = async <T>(url: string, { arg }: { arg: any }): Promise<T> => {
   const response = await apiJson.post<T>(url, { data: arg });
   return response.data; 
};


