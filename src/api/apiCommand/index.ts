import { apiJson, apiPost } from "../axiosInstance";

export const  postFormFetcher = async(url: string, { arg }: { arg: any }) => {
   var response = await apiPost.post(url,{data: arg}).catch((error) => console.error('Error:', error));
   console.log(response);
};


export const  postJsonFetcher = async(url: string, { arg }: { arg: any }) => {
   var response = await apiJson.post(url,{data: arg}).catch((error) => console.error('Error:', error));
   console.log(response);
};


