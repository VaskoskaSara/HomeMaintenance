import {  apiJson } from "../axiosInstance";

export const getFetcher = async (url: string) => {
   const response = await apiJson.get(url);
   console.log(response);
   return response;
};
