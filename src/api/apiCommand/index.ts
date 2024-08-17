import { apiJson, apiPost } from "../axiosInstance";

export const  postFormFetcher = async(url: string, { arg }: { arg: any }) => {
   await apiPost.post(url,{data: arg});
};

export const  postJsonFetcher = async(url: string, { arg }: { arg: any }) => {
   await apiJson.post(url,{data: arg});
};


